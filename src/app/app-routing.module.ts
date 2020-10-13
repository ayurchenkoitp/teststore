import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyGuardGuard } from './my-guard.guard';


const routes: Routes = [
  //{ path: '',   redirectTo: '/home/store', pathMatch: 'full' }, // redirect to home
  { path: 'auth', loadChildren: () => import('./ui/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./ui/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./ui/profile/profile.module').then(m => m.ProfileModule)/*, canActivate: [MyGuardGuard]*/ },
  { path: 'product', loadChildren: () => import('./ui/product/product.module').then(m => m.ProductModule) },
  { path: '**', redirectTo: '/home/store' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [MyGuardGuard]
})
export class AppRoutingModule { }
