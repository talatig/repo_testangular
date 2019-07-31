import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { OutputGraphComponent } from './components/output-graph/output-graph.component';
import { ButtonsComponent } from './core/components/buttons/buttons';
import { TabsComponent } from './core/components/tabs/tabs';
import { DatePickerComponent } from './core/components/datePicker/datePicker';
import { KendoGridComponent } from './components/kendo-grid/kendo-grid.component';
import { KendoChartComponent } from './components/kendo-chart/kendo-chart.component';
import { ParentComponent } from './components/parent/parent.component';
import { OnboardingComponent } from './components/onboarding/s1/onboarding.component';
import { S2Component } from './components/onboarding/s2/s2.component';
import { S3Component } from './components/onboarding/s3/s3.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'kendogrid',
    component: KendoGridComponent
  },
  {
    path: 'kendochart',
    component: KendoChartComponent
  },
  {
    path: 'graph',
    component: OutputGraphComponent
  },
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'buttons',
    component: ButtonsComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'datePicker',
    component: DatePickerComponent
  },
  {
    path: 'parentchild',
    component: ParentComponent
  },
  {
    path: 'onboarding',
    component: OnboardingComponent
  },
  {
    path: 's2',
    component: S2Component
  },
  {
    path: 's3',
    component: S3Component
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
