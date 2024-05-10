import { ComponentFixture, TestBed } from '@angular/core/testing';

import { REQUEST } from '../app-services/app.tokens';

import { FooComponent } from './foo.component';

describe('FooComponent', () => {
  let fixture: ComponentFixture<FooComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [
        {
          provide: REQUEST,
          useValue: {},
        },
      ],
    }).createComponent(FooComponent);
    fixture.detectChanges();
  });

  it('should have <h1>', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

    expect(h1).toBeDefined();
  });
});
