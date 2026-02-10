import { setupZoneTestEnv } from '../../setup-env/zone/index.mjs';

import { PlatformService } from './platform.service';

const mockPlatformService = {
    getName: () => 'mock-platform-service',
};

setupZoneTestEnv({
    extraProviders: [
        {
            provide: PlatformService,
            useValue: mockPlatformService,
        },
    ],
});
