import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { SimpleComponent } from './simple/simple.component';
import { OnPushComponent } from './on-push/on-push.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    SimpleComponent,
    OnPushComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
