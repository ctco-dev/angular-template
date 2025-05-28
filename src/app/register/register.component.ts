import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  name = '';
  password = '';
  confirmPassword = '';
  showPassword = false;

  onRegister() {
    if (this.password === this.confirmPassword) {
      // Registration logic here
      console.log('User registered:', this.email);
    } else {
      console.error('Passwords do not match');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
