import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner-external.component';

describe('BannerComponent (external files)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  describe('setup that may fail', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BannerComponent],
      });
      fixture = TestBed.createComponent(BannerComponent);
    });

    it('should create', () => {
      expect(fixture.componentInstance).toBeDefined();
    });
  });

  describe('Two beforeEach', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BannerComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BannerComponent);
      component = fixture.componentInstance;
      h1 = fixture.nativeElement.querySelector('h1');
    });

    tests();
  });

  describe('One beforeEach', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BannerComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(BannerComponent);
      component = fixture.componentInstance;
      h1 = fixture.nativeElement.querySelector('h1');
    });

    tests();
  });

  function tests() {
    it('no title in the DOM until manually call `detectChanges`', () => {
      expect(h1.textContent).toEqual('');
    });

    it('should display original title', () => {
      fixture.detectChanges();
      expect(h1.textContent).toContain(component.title);
    });

    it('should display a different test title', () => {
      component.title = 'Test Title';
      fixture.detectChanges();
      expect(h1.textContent).toContain('Test Title');
    });
  }
});
