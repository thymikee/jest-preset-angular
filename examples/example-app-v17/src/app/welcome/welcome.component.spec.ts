import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { UserService } from '../model/user.service';

import { WelcomeComponent } from './welcome.component';

class MockUserService {
  isLoggedIn = true;
  user = { name: 'Test User' };
}

describe('WelcomeComponent (class only)', () => {
  let comp: WelcomeComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [WelcomeComponent, { provide: UserService, useClass: MockUserService }],
    });
    // inject both the component and the dependent service.
    comp = TestBed.inject(WelcomeComponent);
    userService = TestBed.inject(UserService);
  });

  it('should not have welcome message after construction', () => {
    expect(comp.welcome).toBe('');
  });

  it('should welcome logged in user after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.welcome).toContain(userService.user.name);
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    userService.isLoggedIn = false;
    comp.ngOnInit();
    expect(comp.welcome).not.toContain(userService.user.name);
    expect(comp.welcome).toContain('log in');
  });
});

describe('WelcomeComponent', () => {
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentUserService: UserService;
  let userService: UserService;
  let el: HTMLElement;

  let userServiceStub: Partial<UserService>;

  beforeEach(() => {
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User' },
    };

    TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [{ provide: UserService, useValue: userServiceStub }],
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    userService = fixture.debugElement.injector.get(UserService);
    componentUserService = userService;
    userService = TestBed.inject(UserService);
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should welcome the user', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Welcome');
    expect(content).toContain('Test User');
  });

  it('should welcome "Bubba"', () => {
    userService.user.name = 'Bubba';
    fixture.detectChanges();
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    userService.isLoggedIn = false;
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).not.toContain('Welcome');
    expect(content).toMatch(/log in/i);
  });

  it("should inject the component's UserService instance", inject([UserService], (service: UserService) => {
    expect(service).toBe(componentUserService);
  }));

  it('TestBed and Component UserService should be the same', () => {
    expect(userService).toBe(componentUserService);
  });
});
