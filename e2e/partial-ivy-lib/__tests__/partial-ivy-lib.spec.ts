import { TestBed, waitForAsync } from '@angular/core/testing';
import { PartialIvyService, PartialIvyComponent, PartialIvyModule } from 'partial-ivy';
import { PartialIvyTestingModule } from 'partial-ivy/testing';

describe('Partial Ivy library', () => {
  let partialIvyComponent: PartialIvyComponent;
  let partialIvyService: PartialIvyService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PartialIvyModule, PartialIvyTestingModule],
    });

    partialIvyComponent = TestBed.createComponent(PartialIvyComponent).componentInstance;
    partialIvyService = TestBed.inject(PartialIvyService);
  }));

  test('should create the component instance', () => {
    expect(partialIvyComponent).toBeDefined();
  });

  test('should create the service instance', () => {
    expect(partialIvyService).toBeDefined();
  });
});
