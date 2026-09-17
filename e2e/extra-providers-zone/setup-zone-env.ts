import { setupZoneTestEnv } from '../../setup-env/zone';

import { PlatformService } from './src/platform.service';

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
