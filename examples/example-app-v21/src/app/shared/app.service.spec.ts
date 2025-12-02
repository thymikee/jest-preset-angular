import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { REQUEST } from './app.tokens';

describe('AppService', () => {
    let service: AppService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: REQUEST,
                    useValue: {},
                },
            ],
        });
        service = TestBed.inject(AppService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
