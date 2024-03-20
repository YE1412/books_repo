import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
//import { HomeComponent } from '@app/home/home.component';
//import { ToolbarComponent } from '@app/toolbar.component';
//import { BookService } from '@app/service';
//import { MatPaginator } from '@angular/material/paginator';
//import { UserService } from '@app/service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
     ],
  // templateUrl: './app.component.html',
  template: `<main>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrl: './app.component.css',
  providers: []
})

export class AppComponent {
  title = 'Angular App';
}
