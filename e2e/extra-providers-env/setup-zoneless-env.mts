import { setupZonelessTestEnv } from '../../setup-env/zoneless/index.mjs';

import { PlatformService } from './platform.service';

const mockPlatformService = {
    getName: () => 'mock-platform-service',
};

setupZonelessTestEnv({
    extraProviders: [
        {
            provide: PlatformService,
            useValue: mockPlatformService,
        },
    ],
});
