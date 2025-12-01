import { Component, inject } from '@angular/core';
import { ArticleService } from '../services/article-service';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ ArticleCardComponent, MatProgressSpinnerModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {
  service = inject(ArticleService);
}