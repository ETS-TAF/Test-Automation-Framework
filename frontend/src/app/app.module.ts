
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProjectComponent } from './project/project.component';
import { TestApiComponent } from './interface-test-api/test-api/test-api.component';

import { MatTableModule } from '@angular/material/table';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { AddTestDialogComponent } from './interface-test-api/test-api/add-test-dialog/add-test-dialog.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { DeleteTestDialogComponent } from './interface-test-api/test-api/delete-test-dialog/delete-test-dialog.component';
import {MatCardModule} from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TestSeleniumComponent } from './selenium/test-selenium.component';

import { PerformanceTestApiModule } from './performance-test-api/performance-test-api.module';
import { PerformanceTestApiComponent } from './performance-test-api/performance-test-api.component';
import { GatlingApiComponent } from './performance-test-api/gatling-api/gatling-api.component';
import { JmeterApiComponent } from './performance-test-api/jmeter-api/jmeter-api.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BusyConfig, NgBusyModule} from 'ng-busy';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ProjectComponent,
    TestApiComponent,
    AddTestDialogComponent,
    DeleteTestDialogComponent,
    TestSeleniumComponent,
    PerformanceTestApiComponent,
    GatlingApiComponent,
    JmeterApiComponent
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatTableModule,
        BrowserAnimationsModule,
        PerformanceTestApiModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        NgBusyModule.forRoot(new BusyConfig({
          message: 'Veuillez patienter',
        })),
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
