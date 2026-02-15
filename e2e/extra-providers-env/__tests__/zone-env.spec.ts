import { TestBed } from '@angular/core/testing';

import { PlatformService } from '../platform.service';
import { TestComponent } from '../test.component';

describe('ExtraProviders with Zone', () => {
    it('should use mocked platform service', () => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });
        const fixture = TestBed.createComponent(TestComponent);
        const platformService = TestBed.inject(PlatformService);

        expect(platformService.getName()).toBe('mock-platform-service');
        expect(fixture.componentInstance.platformName).toBe('mock-platform-service');
    });
});
