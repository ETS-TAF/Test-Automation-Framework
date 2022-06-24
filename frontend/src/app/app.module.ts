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
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './_components';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddSuiteComponent,
    AddPlanComponent,
    AddCaseComponent,
    TestExecutionComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
