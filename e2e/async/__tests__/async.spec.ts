import type { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

@Component({
    standalone: true,
    selector: 'snd-button-page',
    template: `
        <p>button-page works!</p>
        <p>
            <button
                mat-button
                (click)="click()"
            >
                Click
            </button>
        </p>
    `,
    styles: [],
    imports: [MatButton],
})
class ButtonPageComponent {
    r = 0;

    click(): void {
        this.r = 1;
    }
}

describe('ButtonPageComponent', () => {
    let component: ButtonPageComponent;
    let fixture: ComponentFixture<ButtonPageComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonPageComponent],
            providers: [
                {
                    provide: MATERIAL_SANITY_CHECKS,
                    useValue: false,
                },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(ButtonPageComponent);
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    beforeEach(() => {
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });

    test('should click', async () => {
        const button = await loader.getHarness(MatButtonHarness);
        await button.click();

        expect(component.r).toBe(1);
    });
});

describe('async with Angular testing apis', () => {
    test('fakeAsync should work', fakeAsync(() => {
        let flag = false;
        setTimeout(() => {
            flag = true;
        }, 100);
        expect(flag).toBe(false);
        tick(50);
        expect(flag).toBe(false);
        tick(50);
        expect(flag).toBe(true);
    }));

    test('waitForAsync should work', waitForAsync(() => {
        let flag = false;
        setTimeout(() => {
            flag = true;
            expect(flag).toBe(true);
        }, 100);
    }));
});
