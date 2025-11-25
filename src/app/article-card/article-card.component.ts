import { Component, input  } from '@angular/core';
import { Article } from '../models/article';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [MatCardModule, DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  article = input<Article>();
}
