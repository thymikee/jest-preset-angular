import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';

test('signal inputs', () => {
    @Component({
        selector: 'greet',
        standalone: true,
        template: 'Name: {{name()}}',
    })
    class GreetCmp {
        name = input.required<string>();
    }

    @Component({
        standalone: true,
        imports: [GreetCmp],
        template: '<greet [name]="name" />',
    })
    class TestCmp {
        name = 'John';
    }

    const fixture = TestBed.createComponent(TestCmp);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toBe('Name: John');
});
