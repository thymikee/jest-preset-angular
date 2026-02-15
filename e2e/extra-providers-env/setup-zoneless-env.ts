import { setupZonelessTestEnv } from '../../setup-env/zoneless';

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
