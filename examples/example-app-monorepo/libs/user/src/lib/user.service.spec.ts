import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, test } from '@jest/globals';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService],
        });
        service = TestBed.inject(UserService);
    });

    test('should be created', () => {
        expect(service.isLoggedIn).toBe(true);
        expect(service.user).toEqual({ name: 'Sam Spade' });
    });
});
