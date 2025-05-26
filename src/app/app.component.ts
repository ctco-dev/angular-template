
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { FormsModule } from '@angular/forms';
import { SiteHeaderComponent } from "./site-header/site-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GuestBookComponent, FormsModule, SiteHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-template';
}
