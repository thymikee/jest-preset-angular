import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicHostComponent } from './dynamic-host.component';
import { DynamicHostModule } from './dynamic-host.module';

describe('Dynamic components', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicHostModule],
    });
  });

  it('dynamically renders a button', async () => {
    const fixture = TestBed.createComponent(DynamicHostComponent);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.textContent).toContain('Hello');
  });
});
