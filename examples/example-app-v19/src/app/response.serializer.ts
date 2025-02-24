import { HttpResponse } from '@angular/common/http';
import { ZodError, ZodObject, ZodTypeAny, z } from 'zod';

export async function serializeResponse<T extends ZodTypeAny>(
    zodRef: T,
    response: HttpResponse<unknown>,
    debug = false,
) {
    const { data: body, error } = await serializeResponseBody(zodRef, response.body, debug);

    if (error && debug) {
        reportSchemaDeviation(error, response);
    }

    return response.clone({ body });
}

export type SerializeBodyResult<T extends ZodTypeAny> = Promise<{
    data: z.infer<T>;
    error?: ZodError;
}>;

export async function serializeResponseBody<T extends ZodTypeAny>(
    zodRef: T,
    body: unknown,
    strict = false,
): SerializeBodyResult<T> {
    const { data, error, success } =
        zodRef instanceof ZodObject
            ? await (strict ? zodRef.strict().safeParseAsync(body) : zodRef.safeParseAsync(body))
            : await zodRef.safeParseAsync(body);

    if (success) {
        return { data };
    }

    return { error, data };
}

function reportSchemaDeviation(error: ZodError, response: HttpResponse<unknown>) {
    const debug = (msg: string) => console.log(`%c${msg}`, 'color: orange;');

    debug('----- [DataAccess] ⚠️ Response schema errors detected (dev mode) -----');
    debug(`Request ${response.url}`);
    debug(`Response ${response.status} (${response.statusText})`);
    console.warn(error.errors);
    const { formErrors } = error.flatten();
    debug(formErrors.join(','));
}
