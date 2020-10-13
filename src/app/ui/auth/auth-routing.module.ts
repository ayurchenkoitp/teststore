import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StartPageComponent } from './pages/start-page/start-page.component';



const routes: Routes = [
  { path: '', component: StartPageComponent, children: [{path:'register', component: RegisterComponent}, {path:'login', component:LoginComponent} ]},
  //{ path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
