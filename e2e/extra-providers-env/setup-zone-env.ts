import { setupZoneTestEnv } from '../../setup-env/zone';

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
