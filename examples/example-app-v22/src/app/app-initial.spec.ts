import { DebugElement } from '@angular/core';
import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';

import { AppInitial } from './app-initial';

describe('AppComponent (initial CLI version)', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppInitial],
        }).compileComponents();
    }));

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppInitial);
        const app = fixture.componentInstance;

        expect(app).toBeTruthy();
    }));

    it("should have as title 'app'", waitForAsync(() => {
        const fixture = TestBed.createComponent(AppInitial);
        const app = fixture.componentInstance;

        expect(app.title).toEqual('app');
    }));

    it('should render title', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppInitial);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;

        expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to app!');
    }));
});

describe('AppComponent (initial CLI version - as it should be)', () => {
    let app: AppInitial;
    let de: DebugElement;
    let fixture: ComponentFixture<AppInitial>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppInitial],
        });

        fixture = TestBed.createComponent(AppInitial);
        app = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should create the app', () => {
        expect(app).toBeDefined();
    });

    it("should have as title 'app'", () => {
        expect(app.title).toEqual('app');
    });

    it('should render title in an h1 tag', () => {
        fixture.detectChanges();

        expect(de.nativeElement.querySelector('h1').textContent).toContain('Welcome to app!');
    });
});
