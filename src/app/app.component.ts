
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Article } from './models/article';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleListComponent } from "./article-list/article-list.component";
import { HttpArticleListComponent } from './http-article-list/http-article-list.component';
import { MatCardModule } from "@angular/material/card";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ArticleCardComponent, ArticleListComponent, MatCardModule, HttpArticleListComponent, MatButton, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular-template';

    article: Article = {
    id: 1,  
    title: 'Angular Material Tutorial',
    description: 'Learn how to style components using Angular Material.',
    picture: 'https://picsum.photos/300/200',
    publishDate: new Date('2024-11-21'),
  };
}
