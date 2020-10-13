import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { StoreComponent } from './pages/store/store.component';

@NgModule({
    declarations: [
        StartPageComponent,
        StoreComponent,
        CategoriesComponent
    ],
    imports: [HomeRoutingModule, SharedModule]
}
)

export class HomeModule{



}