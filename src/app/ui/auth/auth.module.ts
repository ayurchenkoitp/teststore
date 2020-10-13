import { NgModule } from "@angular/core";
import { AuthRoutingModule } from './auth-routing.module';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
    declarations: [
        StartPageComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [AuthRoutingModule, SharedModule],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
      ],
    exports: [RegisterComponent]
}
)

export class AuthModule{
}