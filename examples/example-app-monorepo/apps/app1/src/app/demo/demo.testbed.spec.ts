import { Component, DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NgModel, NgControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { jest } from '@jest/globals';

import { click } from '../../testing';

import {
  DemoModule,
  BankAccountComponent,
  BankAccountParentComponent,
  LightswitchComponent,
  Child1Component,
  Child2Component,
  Child3Component,
  MasterService,
  ValueService,
  ExternalTemplateComponent,
  InputComponent,
  IoComponent,
  IoParentComponent,
  MyIfComponent,
  MyIfChildComponent,
  MyIfParentComponent,
  NeedsContentComponent,
  ParentComponent,
  TestProvidersComponent,
  TestViewProvidersComponent,
  ReversePipeComponent,
  ShellComponent,
} from './demo';

// eslint-disable-next-line jest/no-export
export class NotProvided extends ValueService {
  /* example below */
}

describe('demo (with TestBed):', () => {
  describe('ValueService', () => {
    let service: ValueService;

    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [ValueService] });
      service = TestBed.inject(ValueService);
    });

    it('should use ValueService', () => {
      service = TestBed.inject(ValueService);
      expect(service.getValue()).toBe('real value');
    });

    it('can inject a default value when service is not provided', () => {
      expect(TestBed.inject(NotProvided, null)).toBeNull();
    });

    it('test should wait for ValueService.getPromiseValue', waitForAsync(() => {
      service.getPromiseValue().then((value) => expect(value).toBe('promise value'));
    }));

    it('test should wait for ValueService.getObservableValue', waitForAsync(() => {
      service.getObservableValue().subscribe((value) => expect(value).toBe('observable value'));
    }));

    it('test should wait for ValueService.getObservableDelayValue', waitForAsync(() => {
      service.getObservableDelayValue().subscribe((value) => {
        expect(value).toBe('observable delay value');
      });
    }));

    it('should allow the use of fakeAsync', fakeAsync(() => {
      let value = '';
      service.getPromiseValue().then((val: string) => (value = val));
      tick();
      expect(value).toBe('promise value');
    }));
  });

  describe('MasterService', () => {
    let masterService: MasterService;
    let valueService: ValueService;
    let valueServiceSpy: {
      getValue: ReturnType<typeof jest.spyOn>;
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          MasterService,
          {
            provide: ValueService,
            useValue: {
              getValue: jest.fn(),
            },
          },
        ],
      });

      masterService = TestBed.inject(MasterService);
      valueService = TestBed.inject(ValueService);
      valueServiceSpy = {
        getValue: jest.spyOn(valueService, 'getValue'),
      };
    });

    it('#getValue should return stubbed value from a spy', () => {
      const stubValue = 'stub value';
      valueServiceSpy.getValue.mockImplementation(() => stubValue);

      expect(masterService.getValue()).toEqual(stubValue);
      expect(valueServiceSpy.getValue.mock.calls.length).toEqual(1);
      expect(valueService.getValue()).toBe(stubValue);
    });
  });

  describe('use inject within `it`', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [ValueService] });
    });

    it('should use modified providers', inject([ValueService], (service: ValueService) => {
      service.setValue('value modified in beforeEach');
      expect(service.getValue()).toBe('value modified in beforeEach');
    }));
  });

  describe('using waitForAsync(inject) within beforeEach', () => {
    let serviceValue: string;

    beforeEach(() => {
      TestBed.configureTestingModule({ providers: [ValueService] });
    });

    beforeEach(waitForAsync(
      inject([ValueService], (service: ValueService) => {
        service.getPromiseValue().then((value) => (serviceValue = value));
      }),
    ));

    it('should use asynchronously modified value ... in synchronous test', () => {
      expect(serviceValue).toBe('promise value');
    });
  });

  describe('TestBed component tests', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DemoModule],
      }).compileComponents();
    }));

    it('should create a component with inline template', () => {
      const fixture = TestBed.createComponent(Child1Component);
      fixture.detectChanges();

      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toMatch(/.*Child.*/);
    });

    it('should create a component with external template', () => {
      const fixture = TestBed.createComponent(ExternalTemplateComponent);
      fixture.detectChanges();

      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toEqual('from external template');
    });

    it('should allow changing members of the component', () => {
      const fixture = TestBed.createComponent(MyIfComponent);

      fixture.detectChanges();
      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toContain('MyIf()');

      fixture.componentInstance.showMore = true;
      fixture.detectChanges();
      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toEqual('MyIf(More)');
    });

    it('should create a nested component bound to inputs/outputs', () => {
      const fixture = TestBed.createComponent(IoParentComponent);

      fixture.detectChanges();
      const heroes = fixture.debugElement.queryAll(By.css('.hero'));
      expect(heroes.length).toBeGreaterThan(0);

      const comp = fixture.componentInstance;
      const hero = comp.heroes[0];

      click(heroes[0]);
      fixture.detectChanges();

      const selected = fixture.debugElement.query(By.css('p'));
      expect((<HTMLElement>selected.nativeElement).textContent).toContain(hero.name);
    });

    it('can access the instance variable of an `*ngFor` row component', () => {
      const fixture = TestBed.createComponent(IoParentComponent);
      const comp = fixture.componentInstance;
      const heroName = comp.heroes[0].name;

      fixture.detectChanges();
      const ngForRow = fixture.debugElement.query(By.directive(IoComponent));

      const hero = ngForRow.context.hero;
      expect(hero.name).toBe(heroName);

      const rowComp = ngForRow.componentInstance;

      expect(rowComp).toEqual(expect.any(IoComponent));
      expect(rowComp.hero.name).toBe(heroName);
    });

    it('should support clicking a button', () => {
      const fixture = TestBed.createComponent(LightswitchComponent);
      const btn = fixture.debugElement.query(By.css('button'));
      const span = fixture.debugElement.query(By.css('span')).nativeElement;

      fixture.detectChanges();
      expect(span.textContent).toMatch(/is off/i);

      click(btn);
      fixture.detectChanges();
      expect(span.textContent).toMatch(/is on/i);
    });

    it('should support entering text in input box (ngModel)', waitForAsync(() => {
      const expectedOrigName = 'John';
      const expectedNewName = 'Sally';

      const fixture = TestBed.createComponent(InputComponent);
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(comp.name).toBe(expectedOrigName);

      fixture
        .whenStable()
        .then(() => {
          expect(input.value).toBe(expectedOrigName);

          input.value = expectedNewName;

          expect(comp.name).toBe(expectedOrigName);

          input.dispatchEvent(new Event('input'));

          return fixture.whenStable();
        })
        .then(() => {
          expect(comp.name).toBe(expectedNewName);
        });
    }));

    it('should support entering text in input box (ngModel) - fakeAsync', fakeAsync(() => {
      const expectedOrigName = 'John';
      const expectedNewName = 'Sally';

      const fixture = TestBed.createComponent(InputComponent);
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(comp.name).toBe(expectedOrigName);

      tick();
      expect(input.value).toBe(expectedOrigName);

      input.value = expectedNewName;

      expect(comp.name).toBe(expectedOrigName);

      input.dispatchEvent(new Event('input'));
      tick();
      expect(comp.name).toBe(expectedNewName);
    }));

    it('ReversePipeComp should reverse the input text', fakeAsync(() => {
      const inputText = 'the quick brown fox.';
      const expectedText = '.xof nworb kciuq eht';

      const fixture = TestBed.createComponent(ReversePipeComponent);
      fixture.detectChanges();

      const comp = fixture.componentInstance;
      const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      const span = fixture.debugElement.query(By.css('span')).nativeElement as HTMLElement;

      input.value = inputText;

      input.dispatchEvent(new Event('input'));
      tick();
      fixture.detectChanges();
      expect(span.textContent).toBe(expectedText);
      expect(comp.text).toBe(inputText);
    }));

    it('can examine attached directives and listeners', () => {
      const fixture = TestBed.createComponent(InputComponent);
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('input'));

      expect(inputEl.providerTokens).toContain(NgModel);

      const ngControl = inputEl.injector.get(NgControl);
      expect(ngControl).toEqual(expect.any(NgControl));

      expect(inputEl.listeners.length).toBeGreaterThan(2);
    });

    it('BankAccountComponent should set attributes, styles, classes, and properties', () => {
      const fixture = TestBed.createComponent(BankAccountParentComponent);
      fixture.detectChanges();
      const comp = fixture.componentInstance;

      const el = fixture.debugElement.children[0];
      const childComp = el.componentInstance as BankAccountComponent;
      expect(childComp).toEqual(expect.any(BankAccountComponent));

      expect(el.context).toBe(childComp);

      expect(el.attributes['account']).toBe(childComp.id);
      expect(el.attributes['bank']).toBe(childComp.bank);

      expect(el.classes['closed']).toBe(true);
      expect(el.classes['open']).toBeFalsy();

      expect(el.styles['color']).toBe(comp.color);
      expect(el.styles['width']).toBe(comp.width + 'px');
    });
  });

  describe('TestBed component overrides:', () => {
    it("should override ChildComp's template", () => {
      const fixture = TestBed.configureTestingModule({
        declarations: [Child1Component],
      })
        .overrideComponent(Child1Component, {
          set: { template: '<span>Fake</span>' },
        })
        .createComponent(Child1Component);

      fixture.detectChanges();
      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toEqual('Fake');
    });

    it("should override TestProvidersComp's ValueService provider", () => {
      const fixture = TestBed.configureTestingModule({
        declarations: [TestProvidersComponent],
      })
        .overrideComponent(TestProvidersComponent, {
          remove: { providers: [ValueService] },
          add: { providers: [{ provide: ValueService, useClass: FakeValueService }] },
        })
        .createComponent(TestProvidersComponent);

      fixture.detectChanges();
      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toEqual('injected value: faked value');

      const tokens = fixture.debugElement.providerTokens;
      expect(tokens).toContain(fixture.componentInstance.constructor);
      expect(tokens).toContain(TestProvidersComponent);
      expect(tokens).toContain(ValueService);
    });

    it("should override TestViewProvidersComp's ValueService viewProvider", () => {
      const fixture = TestBed.configureTestingModule({
        declarations: [TestViewProvidersComponent],
      })
        .overrideComponent(TestViewProvidersComponent, {
          set: { viewProviders: [{ provide: ValueService, useClass: FakeValueService }] },
        })
        .createComponent(TestViewProvidersComponent);

      fixture.detectChanges();
      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toEqual('injected value: faked value');
    });

    it("injected provider should not be same as component's provider", () => {
      @Component({ template: '<my-service-comp></my-service-comp>' })
      class TestComponent {}

      const fixture = TestBed.configureTestingModule({
        declarations: [TestComponent, TestProvidersComponent],
        providers: [ValueService],
      })
        .overrideComponent(TestComponent, {
          set: { providers: [{ provide: ValueService, useValue: {} }] },
        })
        .overrideComponent(TestProvidersComponent, {
          set: { providers: [{ provide: ValueService, useClass: FakeValueService }] },
        })
        .createComponent(TestComponent);

      let testBedProvider!: ValueService;

      inject([ValueService], (s: ValueService) => (testBedProvider = s))();
      const tcProvider = fixture.debugElement.injector.get(ValueService) as ValueService;
      const tpcProvider = fixture.debugElement.children[0].injector.get(ValueService) as FakeValueService;

      expect(testBedProvider).not.toBe(tcProvider);
      expect(testBedProvider).not.toBe(tpcProvider);

      expect(testBedProvider instanceof ValueService).toBeTruthy();
      expect(tcProvider).toEqual({} as ValueService);
      expect(tpcProvider instanceof FakeValueService).toBeTruthy();
    });

    it('can access template local variables as references', () => {
      const fixture = TestBed.configureTestingModule({
        declarations: [ShellComponent, NeedsContentComponent, Child1Component, Child2Component, Child3Component],
      })
        .overrideComponent(ShellComponent, {
          set: {
            selector: 'test-shell',
            template: `
          <needs-content #nc>
            <child-1 #content text="My"></child-1>
            <child-2 #content text="dog"></child-2>
            <child-2 text="has"></child-2>
            <child-3 #content text="fleas"></child-3>
            <div #content>!</div>
          </needs-content>
          `,
          },
        })
        .createComponent(ShellComponent);

      fixture.detectChanges();

      const el = fixture.debugElement.children[0];
      const comp = el.componentInstance;

      expect(comp.children.toArray().length).toBe(4);

      expect(el.references['nc']).toBe(comp);

      const contentRefs = el.queryAll((de) => de.references['content']);
      expect(contentRefs.length).toBe(4);
    });
  });

  describe('nested (one-deep) component override', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ParentComponent, FakeChildComponent],
      });
    });

    it('ParentComp should use Fake Child component', () => {
      const fixture = TestBed.createComponent(ParentComponent);
      fixture.detectChanges();
      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toEqual('Parent(Fake Child)');
    });
  });

  describe('nested (two-deep) component override', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ParentComponent, FakeChildWithGrandchildComponent, FakeGrandchildComponent],
      });
    });

    it('should use Fake Grandchild component', () => {
      const fixture = TestBed.createComponent(ParentComponent);
      fixture.detectChanges();
      expect((<HTMLElement>fixture.debugElement.nativeElement).textContent).toEqual(
        'Parent(Fake Child(Fake Grandchild))',
      );
    });
  });

  describe('lifecycle hooks w/ MyIfParentComp', () => {
    let fixture: ComponentFixture<MyIfParentComponent>;
    let parent: MyIfParentComponent;
    let child: MyIfChildComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [MyIfChildComponent, MyIfParentComponent],
      });

      fixture = TestBed.createComponent(MyIfParentComponent);
      parent = fixture.componentInstance;
    });

    it('should instantiate parent component', () => {
      expect(parent).not.toBeNull();
    });

    it('parent component OnInit should NOT be called before first detectChanges()', () => {
      expect(parent.ngOnInitCalled).toBe(false);
    });

    it('parent component OnInit should be called after first detectChanges()', () => {
      fixture.detectChanges();
      expect(parent.ngOnInitCalled).toBe(true);
    });

    it('child component should exist after OnInit', () => {
      fixture.detectChanges();
      getChild();
      expect(child instanceof MyIfChildComponent).toBeTruthy();
    });

    it("should have called child component's OnInit", () => {
      fixture.detectChanges();
      getChild();
      expect(child.ngOnInitCalled).toBe(true);
    });

    it('child component called OnChanges once', () => {
      fixture.detectChanges();
      getChild();
      expect(child.ngOnChangesCounter).toBe(1);
    });

    it('changed parent value flows to child', () => {
      fixture.detectChanges();
      getChild();

      parent.parentValue = 'foo';
      fixture.detectChanges();

      expect(child.ngOnChangesCounter).toBe(2);
      expect(child.childValue).toBe('foo');
    });

    it('changed child value flows to parent', waitForAsync(() => {
      fixture.detectChanges();
      getChild();

      child.childValue = 'bar';

      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 0);
      }).then(() => {
        fixture.detectChanges();

        expect(child.ngOnChangesCounter).toBe(2);
        expect(parent.parentValue).toBe('bar');
      });
    }));

    it('clicking "Close Child" triggers child OnDestroy', () => {
      fixture.detectChanges();
      getChild();

      const btn = fixture.debugElement.query(By.css('button'));
      click(btn);

      fixture.detectChanges();
      expect(child.ngOnDestroyCalled).toBe(true);
    });

    function getChild() {
      let childDe: DebugElement;

      try {
        childDe = fixture.debugElement.children[4].children[0];
      } catch (err) {}

      childDe = fixture.debugElement.queryAll((de) => de.componentInstance instanceof MyIfChildComponent)[0];

      childDe = fixture.debugElement.query((de) => de.componentInstance instanceof MyIfChildComponent);

      if (childDe && childDe.componentInstance) {
        child = childDe.componentInstance;
      } else {
        throw new Error('Unable to find MyIfChildComp within MyIfParentComp');
      }

      return child;
    }
  });
});

@Component({
  selector: 'child-1',
  template: `Fake Child`,
})
class FakeChildComponent {}

@Component({
  selector: 'child-1',
  template: `Fake Child(<grandchild-1></grandchild-1>)`,
})
class FakeChildWithGrandchildComponent {}

@Component({
  selector: 'grandchild-1',
  template: `Fake Grandchild`,
})
class FakeGrandchildComponent {}

@Injectable()
class FakeValueService extends ValueService {
  value = 'faked value';
}
