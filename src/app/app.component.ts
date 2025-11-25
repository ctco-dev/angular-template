
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Article } from './models/article';
import { ArticleCardComponent } from './article-card/article-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArticleCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-template';

    article: Article = {
    title: 'Angular Material Tutorial',
    description: 'Learn how to style components using Angular Material.',
    picture: 'https://picsum.photos/300/200',
    publishDate: new Date('2024-11-21'),
  };
}
