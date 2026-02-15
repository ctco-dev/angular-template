import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  private http = inject(HttpClient);
  public route = inject(ActivatedRoute);

  posts = signal<any[]>([]);
  comments = signal<any[]>([]);
  loading = signal(false);
  currentPost = signal<any>(null);

  constructor() {
    this.loadPosts();

    this.route.params.subscribe(params => {
      const postId = params['id'];
      if (postId) {
        this.loadComments(postId);
      }
    });
  }

  loadPosts() {
    this.loading.set(true);
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe({
        next: (posts: any) => {
          this.posts.set(posts);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
        }
      });
  }

  loadComments(postId: number) {
    this.loading.set(true);
    this.currentPost.set(this.posts().find(p => p.id == postId));
    this.http.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .subscribe({
        next: (comments: any) => {
          this.comments.set(comments);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
        }
      });
  }
}
