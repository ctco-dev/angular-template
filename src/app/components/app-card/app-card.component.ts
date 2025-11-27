import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardHeader, MatCardContent, MatCard, MatCardTitle, MatCardFooter } from '@angular/material/card';
import { Article } from '../models/article';

@Component({
  selector: 'app-card',
  imports: [MatCardHeader, MatCardContent, MatCard, MatCardTitle, MatCardFooter, DatePipe],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss'
})
export class AppCardComponent {
    article = input<Article>();
}



