import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { GeoChartComponent } from './ngc-compiled-lib.component';

describe('GeoChartComponent', () => {
  let component: GeoChartComponent;
  let fixture: ComponentFixture<GeoChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, Ng2GoogleChartsModule],
      providers: [],
      declarations: [GeoChartComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
