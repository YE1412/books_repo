import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { ThemeToggleComponent } from '@app/theme-toggle/theme-toggle.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component ({
    selector: 'toolbar-login',
    templateUrl: 'toolbar-login.component.html',
    styleUrls: [ 'toolbar-login.component.css' ],
    standalone: true,
    imports: [
        MatIconModule,
        MatToolbarModule,
        ThemeToggleComponent,
        MatButtonModule,
        RouterLink,
        RouterLinkActive
    ]
})

export class ToolbarLoginComponent {
}