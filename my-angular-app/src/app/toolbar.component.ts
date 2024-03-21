import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '@app/service';
import { UserModel, RoleModel } from '@app/models';
import { ThemeToggleComponent } from '@app/theme-toggle/theme-toggle.component';

@Component ({
    selector: 'toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: [ 'toolbar.component.css' ],
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        RouterLink,
        RouterLinkActive,
        ThemeToggleComponent
    ]
})

export class ToolbarComponent {
    user: UserModel | null;
    constructor(private _userService: UserService){
        _userService.user.subscribe((x:UserModel | null) => this.user = x);
        //_userService.user.subscribe((x:string | null) => x);
    }

    get isAdmin() {
        var hasAdminRole: boolean = false;
        if (this.user !== null){
            this.user['roles'].forEach((userRole: RoleModel) => {
                if (userRole.id == 1){
                    hasAdminRole = true;
                    return;
                }
            });
        }
        return this.user !== null && hasAdminRole;
    }

    logout() {
        this._userService.logout();
    }
}