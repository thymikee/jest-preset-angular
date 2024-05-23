import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: true,
  template: ` <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />`,
  imports: [HighlightDirective],
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  let bareH2: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HighlightDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;

    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;

    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan');

    input.value = 'green';

    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green');
  });

  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties['customProperty']).toBeUndefined();
  });

  it('can inject `HighlightDirective` in 1st <h2>', () => {
    const dir = des[0].injector.get(HighlightDirective);

    expect(des[0].injector.get(HighlightDirective)).toBeTruthy();
  });

  it('cannot inject `HighlightDirective` in 3rd <h2>', () => {
    const dir = bareH2.injector.get(HighlightDirective, null);

    expect(dir).toBe(null);
  });

  it('should have `HighlightDirective` in 1st <h2> providerTokens', () => {
    expect(des[0].providerTokens).toContain(HighlightDirective);
  });

  it('should not have `HighlightDirective` in 3rd <h2> providerTokens', () => {
    expect(bareH2.providerTokens).not.toContain(HighlightDirective);
  });
});
