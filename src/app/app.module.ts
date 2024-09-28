import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './component/pie-chart/pie-chart.component';
import { SummaryCardComponent } from './component/summary-card/summary-card.component';
import { LineChartComponent } from './component/line-chart/line-chart.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './component/notifications/notifications.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, SummaryCardComponent, DetailsComponent, NotificationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule , PieChartComponent, LineChartComponent, BrowserAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
