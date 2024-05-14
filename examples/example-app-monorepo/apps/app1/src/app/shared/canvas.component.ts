import 'zone.js/plugins/zone-patch-canvas';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sample-canvas',
  template: '<canvas #sampleCanvas width="200" height="200"></canvas>',
})
export class CanvasComponent implements AfterViewInit {
  blobSize = 0;
  @ViewChild('sampleCanvas') sampleCanvas?: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const canvas = this.sampleCanvas?.nativeElement;
    const context = canvas?.getContext('2d');

    if (typeof context !== 'undefined' && context !== null) {
      context.clearRect(0, 0, 200, 200);
      context.fillStyle = '#FF1122';
      context.fillRect(0, 0, 200, 200);
    }

    canvas?.toBlob((blob) => {
      this.blobSize = blob?.size ?? 0;
    });
  }
}
