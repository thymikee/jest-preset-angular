import { TestBed, waitForAsync } from '@angular/core/testing';
import { FullIvyService, FullIvyComponent, FullIvyModule } from 'full-ivy';

describe('Full Ivy library', () => {
  let fullIvyComponent: FullIvyComponent;
  let fullIvyService: FullIvyService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FullIvyModule],
      });

      fullIvyComponent = TestBed.createComponent(FullIvyComponent).componentInstance;
      fullIvyService = TestBed.inject(FullIvyService);
    }),
  );

  test('should create the component instance', () => {
    expect(fullIvyComponent).toBeDefined();
  });

  test('should create the service instance', () => {
    expect(fullIvyService).toBeDefined();
  });
});
