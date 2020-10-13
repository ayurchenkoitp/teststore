import { NgModule } from "@angular/core";
import { ProductRoutingModule } from './product-routing.module';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './pages/product/product.component';
import { EditComponent } from './pages/edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        StartPageComponent,
        ProductComponent,
        EditComponent
    ],
    imports: [ProductRoutingModule, SharedModule, FormsModule],
}
)

export class ProductModule{
}