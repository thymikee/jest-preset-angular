import type { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

@Component({
  selector: 'snd-button-page',
  template: `
    <p>button-page works!</p>
    <p>
      <button mat-button (click)="click()">Click</button>
    </p>
  `,
  styles: [],
})
class ButtonPageComponent {
  r = 0;

  click(): void {
    this.r = 1;
  }
}

describe('ButtonPageComponent', () => {
  let component: ButtonPageComponent;
  let fixture: ComponentFixture<ButtonPageComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [ButtonPageComponent],
      providers: [
        {
          provide: MATERIAL_SANITY_CHECKS,
          useValue: false,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ButtonPageComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    expect(component.r).toBe(1);
  });
});
