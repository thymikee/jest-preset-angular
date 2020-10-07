import { BaseError } from 'make-error';

import { ErrorMessage } from './messages';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function interpolate(msg: string, vars: Record<string, any> = {}): string {
  // eslint-disable-next-line no-useless-escape, @typescript-eslint/no-unsafe-return
  return msg.replace(/\{\{([^\}]+)\}\}/g, (_, key) => (key in vars ? vars[key] : _));
}

/**
 * TypeScript diagnostics error. Copy from `ts-jest` and strip out stuffs
 *
 * @internal
 */
export class TSError extends BaseError {
  name = 'TSError';

  constructor(public diagnosticText: string) {
    super(
      interpolate(ErrorMessage.UnableToCompileTypeScript, {
        diagnostics: diagnosticText.trim(),
      }),
    );

    // ensure we blacklist any of our code
    Object.defineProperty(this, 'stack', { value: '' });
  }
}
