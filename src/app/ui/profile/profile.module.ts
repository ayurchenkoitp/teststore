import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { UserProfileComponent, UserProfileComponentDialog } from './pages/user-profile/user-profile.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';

@NgModule({
    declarations: [
        StartPageComponent,
        UserProfileComponentDialog,
        UserProfileComponent,
        AdminProfileComponent
    ],
    imports: [ProfileRoutingModule, SharedModule, FormsModule, AuthModule],
    entryComponents: [StartPageComponent, UserProfileComponentDialog],
}
)

export class ProfileModule{



}