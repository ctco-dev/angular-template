
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppCardComponent } from "./components/app-card/app-card.component";
import { Article } from './components/models/article';
import { ArticleListComponent } from "./components/article-list/article-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppCardComponent, ArticleListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-template';
  article: Article = {
    title: 'Shiba Inu',
    description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
    picture: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
    publishDate: new Date('2024-11-21'),
  };
  
}
