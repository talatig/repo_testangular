import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { OutputGraphComponent } from './components/output-graph/output-graph.component';
import { CoreModule } from './core/core.module';
import { DashboardComponent, DialogOverviewExampleDialog } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ButtonsComponent } from './core/components/buttons/buttons';
import { TabsComponent } from './core/components/tabs/tabs';
import { DatePickerComponent } from './core/components/datePicker/datePicker';
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import {ExcelService} from './core/services/excel.service';
import { KendoGridComponent } from './components/kendo-grid/kendo-grid.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { KendoChartComponent } from './components/kendo-chart/kendo-chart.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { EventLogComponent } from './components/kendo-chart/event-log.component';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogModule } from '@progress/kendo-angular-dialog';
import 'hammerjs';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { OnboardingComponent } from './components/onboarding/s1/onboarding.component';
import { FilterPipe} from './components/onboarding/s1/filter.pipe';
import { S2Component } from './components/onboarding/s2/s2.component';
import { S3Component } from './components/onboarding/s3/s3.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AnalyticsComponent,
    OutputGraphComponent,
    AnalyticsComponent,
    HeaderComponent,
    FooterComponent,
    ButtonsComponent,
    TabsComponent,
    DatePickerComponent,
    KendoGridComponent,
    KendoChartComponent,
    EventLogComponent,
    DialogOverviewExampleDialog,
    ParentComponent,
    ChildComponent,
    OnboardingComponent,
    FilterPipe,
    S2Component,
    S3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatDrpModule,
    GridModule,
    ExcelModule,
    ChartsModule,
    TooltipModule,
    DialogModule
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
