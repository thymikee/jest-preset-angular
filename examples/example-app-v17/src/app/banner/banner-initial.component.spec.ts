import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BannerComponent } from './banner-initial.component';

describe('BannerComponent (initial CLI generated)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [BannerComponent] }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [BannerComponent] });
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (with beforeEach)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [BannerComponent] });
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "banner works!"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('banner works!');
  });

  it('should have <p> with "banner works!"', () => {
    const p = <HTMLElement>fixture.nativeElement.querySelector('p');
    expect(p?.textContent).toEqual('banner works!');
  });

  it('should find the <p> with fixture.debugElement.nativeElement)', () => {
    const p = <HTMLElement>fixture.debugElement.nativeElement.querySelector('p');
    expect(p?.textContent).toEqual('banner works!');
  });

  it('should find the <p> with fixture.debugElement.query(By.css)', () => {
    const p = <HTMLElement>fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.textContent).toEqual('banner works!');
  });
});
