import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../models/article';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-details',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardFooter, RouterLink, DatePipe],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);
  protected article: WritableSignal<Article | undefined> = this.articleService.article;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const parsedId = parseInt(id, 10);
      this.articleService.getArticleById(parsedId);
    }
  }
}
