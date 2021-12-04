import { jest } from '@jest/globals';
import { DoneFn } from '@jest/types/build/Global';

import { LightswitchComponent, MasterService, ValueService, ReversePipe } from './demo';

// eslint-disable-next-line jest/no-export
export class FakeValueService extends ValueService {
  override value = 'faked service value';
}

describe('demo (no TestBed):', () => {
  describe('ValueService', () => {
    let service: ValueService;
    beforeEach(() => {
      service = new ValueService();
    });

    it('#getValue should return real value', () => {
      expect(service.getValue()).toBe('real value');
    });

    // eslint-disable-next-line jest/no-done-callback
    it('#getObservableValue should return value from observable', (done: DoneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        done();
      });
    });

    // eslint-disable-next-line jest/no-done-callback
    it('#getPromiseValue should return value from a promise', (done: DoneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        done();
      });
    });
  });

  describe('MasterService without Angular testing support', () => {
    let masterService: MasterService;

    it('#getValue should return real value from the real service', () => {
      masterService = new MasterService(new ValueService());
      expect(masterService.getValue()).toBe('real value');
    });

    it('#getValue should return faked value from a fakeService', () => {
      masterService = new MasterService(new FakeValueService());
      expect(masterService.getValue()).toBe('faked service value');
    });

    it('#getValue should return faked value from a fake object', () => {
      const fake = { getValue: () => 'fake value' };
      masterService = new MasterService(fake as ValueService);
      expect(masterService.getValue()).toBe('fake value');
    });

    it('#getValue should return stubbed value from a spy', () => {
      const valueServiceSpy = {
        getValue: jest.fn(),
      };

      const stubValue = 'stub value';
      valueServiceSpy.getValue.mockReturnValue(stubValue);

      masterService = new MasterService(valueServiceSpy as unknown as ValueService);

      expect(masterService.getValue()).toEqual(stubValue);
      expect(valueServiceSpy.getValue.mock.calls.length).toEqual(1);
      expect(valueServiceSpy.getValue()).toEqual(stubValue);
    });
  });

  describe('MasterService (no beforeEach)', () => {
    it('#getValue should return stubbed value from a spy', () => {
      const { masterService, stubValue, valueServiceSpy } = setup();
      expect(masterService.getValue()).toEqual(stubValue);
      expect(valueServiceSpy.getValue.mock.calls.length).toBe(1);
      expect(valueServiceSpy.getValue()).toBe(stubValue);
    });

    function setup() {
      const valueServiceSpy = {
        getValue: jest.fn(),
      };
      const stubValue = 'stub value';
      const masterService = new MasterService(valueServiceSpy as unknown as ValueService);

      valueServiceSpy.getValue.mockReturnValue(stubValue);

      return { masterService, stubValue, valueServiceSpy };
    }
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
