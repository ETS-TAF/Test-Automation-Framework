import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './test-project/add-project/add-project.component';
import { AddSuiteComponent } from './test-suite/add-suite/add-suite.component';
import { AddPlanComponent } from './test-plan/add-plan/add-plan.component';
import { AddCaseComponent } from './test-case/add-case/add-case.component';
import { TestExecutionComponent } from './test-execution/test-execution.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddSuiteComponent,
    AddPlanComponent,
    AddCaseComponent,
    TestExecutionComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
