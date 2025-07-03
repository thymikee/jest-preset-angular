import { NgModule } from '@angular/core';

import { TestComponent } from './test-not-standalone.component';
import { TestDirective } from './test-not-standalone.directive';
import { TestPipe } from './test-not-standalone.pipe';

@NgModule({
    declarations: [TestComponent, TestPipe, TestDirective],
    exports: [TestComponent, TestPipe, TestDirective],
})
export class TestModule {}
