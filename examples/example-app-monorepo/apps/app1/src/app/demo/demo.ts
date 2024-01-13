import {
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Injectable,
  Input,
  Output,
  Optional,
  HostBinding,
  HostListener,
  OnInit,
  OnChanges,
  OnDestroy,
  Pipe,
  PipeTransform,
  SimpleChanges,
} from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Hero {
  name: string;
}

@Injectable()
export class ValueService {
  value = 'real value';

  getValue() {
    return this.value;
  }
  setValue(value: string) {
    this.value = value;
  }

  getObservableValue() {
    return of('observable value');
  }

  getPromiseValue() {
    return Promise.resolve('promise value');
  }

  getObservableDelayValue() {
    return of('observable delay value').pipe(delay(10));
  }
}

@Injectable()
export class MasterService {
  constructor(private valueService: ValueService) {}
  getValue() {
    return this.valueService.getValue();
  }
}

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(s: string) {
    let r = '';
    for (let i = s.length; i; ) {
      r += s[--i];
    }

    return r;
  }
}

@Component({
  selector: 'bank-account',
  template: ` Bank Name: {{ bank }} Account Id: {{ id }} `,
})
export class BankAccountComponent {
  @Input() bank = '';
  @Input('account') id = '';
}

@Component({
  selector: 'bank-account-parent',
  template: `
    <bank-account
      bank="RBC"
      account="4747"
      [style.width.px]="width"
      [style.color]="color"
      [class.closed]="isClosed"
      [class.open]="!isClosed"
    >
    </bank-account>
  `,
})
export class BankAccountParentComponent {
  width = 200;
  color = 'red';
  isClosed = true;
}

@Component({
  selector: 'lightswitch-comp',
  template: ` <button (click)="clicked()">Click me!</button>
    <span>{{ message }}</span>`,
})
export class LightswitchComponent {
  isOn = false;
  clicked() {
    this.isOn = !this.isOn;
  }
  get message() {
    return `The light is ${this.isOn ? 'On' : 'Off'}`;
  }
}

@Component({
  selector: 'child-1',
  template: `<span>Child-1({{ text }})</span>`,
})
export class Child1Component {
  @Input() text = 'Original';
}

@Component({
  selector: 'child-2',
  template: '<div>Child-2({{text}})</div>',
})
export class Child2Component {
  @Input() text = '';
}

@Component({
  selector: 'child-3',
  template: '<div>Child-3({{text}})</div>',
})
export class Child3Component {
  @Input() text = '';
}

@Component({
  selector: 'input-comp',
  template: `<input [(ngModel)]="name" />`,
})
export class InputComponent {
  name = 'John';
}

@Directive({ selector: 'input[value]' })
export class InputValueBinderDirective {
  @HostBinding()
  @Input()
  value: unknown;

  @Output()
  valueChange = new EventEmitter();

  @HostListener('input', ['$event.target.value'])
  onInput(value: unknown) {
    this.valueChange.emit(value);
  }
}

@Component({
  selector: 'input-value-comp',
  template: ` Name: <input [(value)]="name" /> {{ name }} `,
})
export class InputValueBinderComponent {
  name = 'Sally';
}

@Component({
  selector: 'parent-comp',
  template: `Parent(<child-1></child-1>)`,
})
export class ParentComponent {}

@Component({
  selector: 'io-comp',
  template: `<div class="hero" (click)="click()">Original {{ hero.name }}</div>`,
})
export class IoComponent {
  @Input() hero!: Hero;
  @Output() selected = new EventEmitter<Hero>();
  click() {
    this.selected.emit(this.hero);
  }
}

@Component({
  selector: 'io-parent-comp',
  template: `
    <p *ngIf="!selectedHero"><i>Click to select a hero</i></p>
    <p *ngIf="selectedHero">The selected hero is {{ selectedHero.name }}</p>
    <io-comp *ngFor="let hero of heroes" [hero]="hero" (selected)="onSelect($event)"> </io-comp>
  `,
})
export class IoParentComponent {
  heroes: Hero[] = [{ name: 'Bob' }, { name: 'Carol' }, { name: 'Ted' }, { name: 'Alice' }];
  selectedHero!: Hero;
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}

@Component({
  selector: 'my-if-comp',
  template: `MyIf(<span *ngIf="showMore">More</span>)`,
})
export class MyIfComponent {
  showMore = false;
}

@Component({
  selector: 'my-service-comp',
  template: `injected value: {{ valueService.value }}`,
  providers: [ValueService],
})
export class TestProvidersComponent {
  constructor(public valueService: ValueService) {}
}

@Component({
  selector: 'my-service-comp',
  template: `injected value: {{ valueService.value }}`,
  viewProviders: [ValueService],
})
export class TestViewProvidersComponent {
  constructor(public valueService: ValueService) {}
}

@Component({
  selector: 'external-template-comp',
  templateUrl: './demo-external-template.html',
})
export class ExternalTemplateComponent implements OnInit {
  serviceValue = '';

  constructor(@Optional() private service?: ValueService) {}

  ngOnInit() {
    if (this.service) {
      this.serviceValue = this.service.getValue();
    }
  }
}

@Component({
  selector: 'comp-w-ext-comp',
  template: `
    <h3>comp-w-ext-comp</h3>
    <external-template-comp></external-template-comp>
  `,
})
export class InnerCompWithExternalTemplateComponent {}

@Component({ selector: 'needs-content', template: '<ng-content></ng-content>' })
export class NeedsContentComponent {
  @ContentChildren('content') children: unknown;
}

@Component({
  selector: 'my-if-child-1',

  template: ` <h4>MyIfChildComp</h4>
    <div>
      <label>Child value: <input [(ngModel)]="childValue" /> </label>
    </div>
    <p><i>Change log:</i></p>
    <div *ngFor="let log of changeLog; let i = index">{{ i + 1 }} - {{ log }}</div>`,
})
export class MyIfChildComponent implements OnInit, OnChanges, OnDestroy {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  get childValue() {
    return this.value;
  }
  set childValue(v: string) {
    if (this.value === v) {
      return;
    }
    this.value = v;
    this.valueChange.emit(v);
  }

  changeLog: string[] = [];

  ngOnInitCalled = false;
  ngOnChangesCounter = 0;
  ngOnDestroyCalled = false;

  ngOnInit() {
    this.ngOnInitCalled = true;
    this.changeLog.push('ngOnInit called');
  }

  ngOnDestroy() {
    this.ngOnDestroyCalled = true;
    this.changeLog.push('ngOnDestroy called');
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      this.ngOnChangesCounter += 1;
      const prop = changes[propName];
      const cur = JSON.stringify(prop.currentValue);
      const prev = JSON.stringify(prop.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
}

@Component({
  selector: 'my-if-parent-comp',
  template: `
    <h3>MyIfParentComp</h3>
    <label
      >Parent value:
      <input [(ngModel)]="parentValue" />
    </label>
    <button (click)="clicked()">{{ toggleLabel }} Child</button><br />
    <div *ngIf="showChild" style="margin: 4px; padding: 4px; background-color: aliceblue;">
      <my-if-child-1 [(value)]="parentValue"></my-if-child-1>
    </div>
  `,
})
export class MyIfParentComponent implements OnInit {
  ngOnInitCalled = false;
  parentValue = 'Hello, World';
  showChild = false;
  toggleLabel = 'Unknown';

  ngOnInit() {
    this.ngOnInitCalled = true;
    this.clicked();
  }

  clicked() {
    this.showChild = !this.showChild;
    this.toggleLabel = this.showChild ? 'Close' : 'Show';
  }
}

@Component({
  selector: 'reverse-pipe-comp',
  template: `
    <input [(ngModel)]="text" />
    <span>{{ text | reverse }}</span>
  `,
})
export class ReversePipeComponent {
  text = 'my dog has fleas.';
}

@Component({ template: '<div>Replace Me</div>' })
export class ShellComponent {}

@Component({
  selector: 'demo-comp',
  template: `
    <h1>Specs Demo</h1>
    <my-if-parent-comp></my-if-parent-comp>
    <hr />
    <h3>Input/Output Component</h3>
    <io-parent-comp></io-parent-comp>
    <hr />
    <h3>External Template Component</h3>
    <external-template-comp></external-template-comp>
    <hr />
    <h3>Component With External Template Component</h3>
    <comp-w-ext-comp></comp-w-ext-comp>
    <hr />
    <h3>Reverse Pipe</h3>
    <reverse-pipe-comp></reverse-pipe-comp>
    <hr />
    <h3>InputValueBinder Directive</h3>
    <input-value-comp></input-value-comp>
    <hr />
    <h3>Button Component</h3>
    <lightswitch-comp></lightswitch-comp>
    <hr />
    <h3>Needs Content</h3>
    <needs-content #nc>
      <child-1 #content text="My"></child-1>
      <child-2 #content text="dog"></child-2>
      <child-2 text="has"></child-2>
      <child-3 #content text="fleas"></child-3>
      <div #content>!</div>
    </needs-content>
  `,
})
export class DemoComponent {}

export const demoDeclarations = [
  DemoComponent,
  BankAccountComponent,
  BankAccountParentComponent,
  LightswitchComponent,
  Child1Component,
  Child2Component,
  Child3Component,
  ExternalTemplateComponent,
  InnerCompWithExternalTemplateComponent,
  InputComponent,
  InputValueBinderDirective,
  InputValueBinderComponent,
  IoComponent,
  IoParentComponent,
  MyIfComponent,
  MyIfChildComponent,
  MyIfParentComponent,
  NeedsContentComponent,
  ParentComponent,
  TestProvidersComponent,
  TestViewProvidersComponent,
  ReversePipe,
  ReversePipeComponent,
  ShellComponent,
];

export const demoProviders = [MasterService, ValueService];

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: demoDeclarations,
  providers: demoProviders,
  bootstrap: [DemoComponent],
})
export class DemoModule {}
