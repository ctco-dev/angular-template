import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <a routerLink="/">Go back Home</a>
  `,
  standalone: true
})
export class NotFoundComponent {}
