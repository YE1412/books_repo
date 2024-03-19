import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';

@Component ({
    selector: 'toolbar-login',
    templateUrl: 'toolbar-login.component.html',
    styleUrls: [ 'toolbar-login.component.css' ],
    standalone: true,
    imports: [
        MatIconModule,
        MatToolbarModule,
    ]
})

export class ToolbarLoginComponent {
}