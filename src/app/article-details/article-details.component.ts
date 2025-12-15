import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpArticleService } from '../services/http-article-service';

@Component({
  selector: 'app-article-details',
  standalone: true,
  templateUrl: './article-details.component.html',
})
export class ArticleDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private articleService = inject(HttpArticleService);

  id = Number(this.route.snapshot.paramMap.get('id'));

  // Signal: auto-updates when articles change
  article = computed(() =>
    this.articleService.articles().find(a => a.id === this.id)
  );

  ngOnInit() {
    // If navigating directly to details URL → ensure articles are loaded
    if (this.articleService.articles().length === 0) {
      this.articleService.getArticles();
    }
  }
}