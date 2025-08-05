import { NgModule } from '@angular/core';

import { TestComponent } from './test.component';
import { TestDirective } from './test.directive';
import { TestPipe } from './test.pipe';

@NgModule({
    imports: [TestComponent, TestDirective, TestPipe],
    exports: [TestComponent, TestDirective, TestPipe],
})
export class TestModule {}
