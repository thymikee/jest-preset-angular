import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';

describe('CanvasComponent', () => {
  let fixture: ComponentFixture<CanvasComponent>;
  let component: CanvasComponent;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        declarations: [CanvasComponent],
      })
        .compileComponents()
        .then(() => {
          (window as typeof window & Record<string, unknown>)['__zone_symbol__FakeAsyncTestMacroTask'] = [
            {
              source: 'HTMLCanvasElement.toBlob',
              callbackArgs: [{ size: 200 }],
            },
          ];
          fixture = TestBed.createComponent(CanvasComponent);
          component = fixture.componentInstance;
        });
    }),
  );

  it('should be able to generate blob data from canvas', fakeAsync(() => {
    fixture.detectChanges();
    expect(component.blobSize).toBe(0);
    tick();
    expect(component.blobSize).toBeGreaterThan(0);
  }));
});
