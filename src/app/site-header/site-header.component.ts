import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss'
})
export class SiteHeaderComponent {
  
  showLoginPopup = false;
  email = '';
  password = '';
  readonly isSignedInSignal = signal(!!localStorage.getItem('token'));

  onSignIn() {
    this.showLoginPopup = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isSignedInSignal.set(false);
  }

}
