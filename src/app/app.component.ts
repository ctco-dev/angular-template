
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GuestBookComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-template';
}
