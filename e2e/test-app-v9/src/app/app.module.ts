import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { SimpleComponent } from './simple/simple.component';
import { OnPushComponent } from './on-push/on-push.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SimpleWithStylesComponent } from './simple-with-styles/simple-with-styles.component';
import { ChildComponent } from './medium/child.component';
import { MediumComponent } from './medium/medium.component';
import { NgReflectAsTextComponent } from './ng-reflect-as-text/ng-reflect-as-text.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    SimpleComponent,
    OnPushComponent,
    HeroesComponent,
    SimpleWithStylesComponent,
    ChildComponent,
    MediumComponent,
    NgReflectAsTextComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
