import {async, ComponentFixture} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import { ConfigureFn, configureTests } from '../__helpers__';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Subject} from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  const mockHeroesSubject = new Subject<Hero[]>();
  const mockHeroService = {
    getHeroes: jest.fn(() => mockHeroesSubject)
  };

  const allHeroes: Hero[] = [
    {
      id: 1,
      name: 'Test hero 1',
    },
    {
      id: 2,
      name: 'Test hero 2',
    }
  ];

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [HeroesComponent],
        providers: [{provide: HeroService, useValue: mockHeroService}]
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(HeroesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  afterEach(() => {
    mockHeroesSubject.complete();
  });

  test('should display a list of all heroes', () => {
    mockHeroesSubject.next(allHeroes);
    fixture.detectChanges();

    const el = fixture.nativeElement;
    expect(el.textContent).toContain('Test hero 1');
    expect(el.textContent).toContain('Test hero 2');
  });
});
