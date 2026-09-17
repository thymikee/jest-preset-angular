import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'platform' })
export class PlatformService {
    getName(): string {
        return 'real-platform-service';
    }
}
