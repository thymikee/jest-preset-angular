import { Component, ElementRef, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';

test('signal queries', () => {
    @Component({
        selector: 'greet',
        standalone: true,
        template: '<input #el>',
    })
    class GreetCmp {
        input = viewChild.required<ElementRef>('el');
    }

    const fixture = TestBed.createComponent(GreetCmp);
    fixture.detectChanges();

    expect(fixture.componentInstance.input()).toBeDefined();
});
