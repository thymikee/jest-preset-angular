import { Injectable } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { jest } from '@jest/globals';

import { LightswitchComponent, MasterService, ReversePipe, ValueService } from './demo';

@Injectable()
// eslint-disable-next-line jest/no-export
export class FakeValueService extends ValueService {
    override value = 'faked service value';
}

describe('demo (no TestBed):', () => {
    let masterService: MasterService;
    let valueService: ValueService;

    describe('ValueService', () => {
        beforeEach(() => {
            valueService = new ValueService();
        });

        it('#getValue should return real value', () => {
            expect(valueService.getValue()).toBe('real value');
        });

        it('#getObservableValue should return value from observable', waitForAsync(() => {
            valueService.getObservableValue().subscribe((value) => {
                expect(value).toBe('observable value');
            });
        }));

        it('#getPromiseValue should return value from a promise', async () => {
            await valueService.getPromiseValue().then((value) => {
                expect(value).toBe('promise value');
            });
        });
    });

    describe('MasterService without Angular testing support', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [MasterService, ValueService],
            });
        });

        it('#getValue should return real value from the real service', () => {
            masterService = TestBed.inject(MasterService);
            expect(masterService.getValue()).toBe('real value');
        });

        it('#getValue should return faked value from a fakeService', () => {
            TestBed.configureTestingModule({
                providers: [MasterService, { provide: ValueService, useClass: FakeValueService }],
            });
            masterService = TestBed.inject(MasterService);
            expect(masterService.getValue()).toBe('faked service value');
        });

        it('#getValue should return faked value from a fake object', () => {
            const fake = { getValue: () => 'fake value' };
            TestBed.configureTestingModule({
                providers: [MasterService, { provide: ValueService, useValue: fake }],
            });
            masterService = TestBed.inject(MasterService);
            expect(masterService.getValue()).toBe('fake value');
        });

        it('#getValue should return stubbed value from a spy', () => {
            const valueServiceSpy = {
                getValue: jest.fn(),
            };

            const stubValue = 'stub value';
            valueServiceSpy.getValue.mockReturnValue(stubValue);

            TestBed.configureTestingModule({
                providers: [MasterService, { provide: ValueService, useValue: valueServiceSpy }],
            });
            masterService = TestBed.inject(MasterService);

            expect(masterService.getValue()).toEqual(stubValue);
            expect(valueServiceSpy.getValue.mock.calls.length).toEqual(1);
            expect(valueServiceSpy.getValue()).toEqual(stubValue);
        });
    });

    describe('MasterService (no beforeEach)', () => {
        it('#getValue should return stubbed value from a spy', () => {
            const valueServiceSpy = {
                getValue: jest.fn(),
            };
            const stubValue = 'stub value';
            valueServiceSpy.getValue.mockReturnValue(stubValue);

            TestBed.configureTestingModule({
                providers: [MasterService, { provide: ValueService, useValue: valueServiceSpy }],
            });
            masterService = TestBed.inject(MasterService);

            expect(masterService.getValue()).toEqual(stubValue);
            expect(valueServiceSpy.getValue.mock.calls.length).toBe(1);
            expect(valueServiceSpy.getValue()).toBe(stubValue);
        });
    });

    describe('ReversePipe', () => {
        let pipe: ReversePipe;

        beforeEach(() => {
            pipe = new ReversePipe();
        });

        it('transforms "abc" to "cba"', () => {
            expect(pipe.transform('abc')).toBe('cba');
        });

        it('no change to palindrome: "able was I ere I saw elba"', () => {
            const palindrome = 'able was I ere I saw elba';
            expect(pipe.transform(palindrome)).toBe(palindrome);
        });
    });

    describe('LightswitchComp', () => {
        it('#clicked() should toggle #isOn', () => {
            const comp = new LightswitchComponent();

            expect(comp.isOn).toBeFalsy();

            comp.clicked();

            expect(comp.isOn).toBeTruthy();

            comp.clicked();

            expect(comp.isOn).toBeFalsy();
        });

        it('#clicked() should set #message to "is on"', () => {
            const comp = new LightswitchComponent();

            expect(comp.message).toMatch(/is off/i);

            comp.clicked();

            expect(comp.message).toMatch(/is on/i);
        });
    });
});
