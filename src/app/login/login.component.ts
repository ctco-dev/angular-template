import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  login(loginForm: NgForm) {
    // Simulate login logic
    if (this.loginData.email && this.loginData.password) {
      console.log('User logged in:', this.loginData.email);
      // Here you would typically call a service to handle the login
      // and store the token in localStorage or a similar mechanism.
      localStorage.setItem('token', 'dummy-token'); // Simulated token
      this.router.navigate(['/blogs']); // Redirect to /blogs after login
    }
  }
}
