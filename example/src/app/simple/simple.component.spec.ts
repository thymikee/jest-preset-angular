import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '@lib/testing';

import { SimpleComponent } from './simple.component';
import { Component } from '@angular/core';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [SimpleComponent]
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(SimpleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('snapshots', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('snapshot on nativeElement should be without ng-version', () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});

@Component({
  selector: 'another-comp',
  template: ''
})
class AnotherComponent {}

describe.each([[SimpleComponent, AnotherComponent]])('Test components', ComponentType => {
  let component: any;
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [ComponentType]
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(ComponentType);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
