import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ProjectComponent } from './project/project.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { JmeterComponent } from './jmeter/jmeter.component';
import { GatlingComponent } from './gatling/gatling.component';
import { TestApiComponent } from './interface-test-api/test-api/test-api.component';
import { TestSeleniumComponent } from './selenium/test-selenium.component';
import { PerformanceTestApiComponent } from './performance-test-api/performance-test-api.component';
import { GatlingApiComponent } from './performance-test-api/gatling-api/gatling-api.component';
import { JmeterApiComponent } from './performance-test-api/jmeter-api/jmeter-api.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path : 'jmeter', component: JmeterComponent },
  { path : 'gatling', component: GatlingComponent },
  { path: 'test-api', component: TestApiComponent },
  { path: 'test-selenium', component: TestSeleniumComponent },
  { path: 'performance-test-api', component: PerformanceTestApiComponent },
  { path: 'performance-test-api', component: PerformanceTestApiComponent },
  { path: 'gatling-test', component: GatlingApiComponent },
  { path: 'jmeter-test', component: JmeterApiComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
