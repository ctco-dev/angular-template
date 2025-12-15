import { Component, Input  } from '@angular/core';
import { Article } from '../models/article';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  imports: [MatCardModule, DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})


export class ArticleCardComponent {
  @Input() article!: Article;

   constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/article', this.article.id]);
  }
}
