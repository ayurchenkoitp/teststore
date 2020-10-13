import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyGuardGuard } from 'src/app/my-guard.guard';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';



const routes: Routes = [
  { path: '', component: StartPageComponent, children: [{path:'', component: UserProfileComponent}, {path:'admin', component: AdminProfileComponent/*, canActivate: [MyGuardGuard]*/} ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
