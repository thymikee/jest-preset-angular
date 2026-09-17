import { setupZonelessTestEnv } from '../../setup-env/zoneless/index.mjs';

import { PlatformService } from './src/platform.service';

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
