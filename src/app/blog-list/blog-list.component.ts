import { Component, computed, signal } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog } from './blog.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  readonly pageSize = 6;
  readonly blogsSignal = toSignal(this.blogService.blogs$, { initialValue: [] as IBlog[] });

  currentPage = signal(1);

  readonly totalPages = computed(() =>
    Math.ceil(this.blogsSignal().length / this.pageSize) || 1
  );

  constructor(private blogService: BlogService, private router: Router) {}

  onBlogSelected(blog: IBlog) {
    this.router.navigate(['/blogs', blog.id], { state: { blog } });
  }

}
