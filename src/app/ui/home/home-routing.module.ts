import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { StoreComponent } from './pages/store/store.component';



const routes: Routes = [
    { path: '', component: StartPageComponent, children: [{path:'store', component: StoreComponent}, {path:'categories', component: CategoriesComponent} ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
