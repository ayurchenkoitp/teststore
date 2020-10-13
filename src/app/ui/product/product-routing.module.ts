import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './pages/edit/edit.component';
import { ProductComponent } from './pages/product/product.component';
import { StartPageComponent } from './pages/start-page/start-page.component';



const routes: Routes = [
  { path: '', component: StartPageComponent, children: [{path:':id', component: ProductComponent}, {path:':id/edit', component: EditComponent}]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
