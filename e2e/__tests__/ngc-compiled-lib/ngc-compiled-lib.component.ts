import { Component, Input, OnChanges } from '@angular/core';
import type { GoogleChartInterface } from 'ng2-google-charts';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'influo-geo-chart',
  template: `
    <google-chart *ngIf="googleChartConfig$ | async as googleChartConfig; else loader" [data]="googleChartConfig">
    </google-chart>
    <ng-template #loader>
      <mat-spinner color="accent" diameter="80" strokeWidth="8"></mat-spinner>
    </ng-template>
  `,
})
export class GeoChartComponent implements OnChanges {
  // eslint-disable-next-line
  @Input() columns: any;
  @Input() config: GoogleChartInterface;
  @Input() data: Array<Array<string | number>> | undefined;

  private defaultConfig: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: [],
    options: {
      legend: false,
      region: 155,
      enableRegionInteractivity: true,
      displayMode: 'region',
      colors: ['#e6e6e6', '#1672AD'],
      datalessRegionColor: '#e6e6e6',
    },
  };

  _googleChartConfig = new BehaviorSubject<GoogleChartInterface | null>(null);

  set googleChartConfig(config: GoogleChartInterface) {
    const value = this._googleChartConfig.getValue() || {};

    this._googleChartConfig.next({ ...value, ...config });
  }

  // eslint-disable-next-line
  get googleChartConfig$(): Observable<any> {
    return this._googleChartConfig.asObservable();
  }

  ngOnChanges(): void {
    if (this.columns && this.data) {
      this.googleChartConfig = { ...this.defaultConfig, ...this.config, dataTable: [this.columns, ...this.data] };
    }
  }
}
