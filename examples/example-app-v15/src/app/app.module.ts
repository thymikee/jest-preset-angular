import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroService } from './model/hero.service';
import { UserService } from './model/user.service';
import { SharedModule } from './shared/shared.module';
import { TwainComponent } from './twain/twain.component';
import { TwainService } from './twain/twain.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
  ],
  providers: [HeroService, TwainService, UserService],
  declarations: [AppComponent, AboutComponent, BannerComponent, TwainComponent, WelcomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
