import { Component, computed, effect, signal } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog } from './blog.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  readonly pageSize = 6;
  readonly blogsSignal = toSignal(this.blogService.blogs$, { initialValue: [] as IBlog[] });

  currentPage = signal(1);

  orderBy = signal<'asc' | 'desc'>(
    (localStorage.getItem('blogOrderBy') as 'asc' | 'desc') || 'desc'
  );

  readonly persistOrderBy = effect(() => {
    localStorage.setItem('blogOrderBy', this.orderBy());
  });

  sortedBlogs = computed(() => {
    const blogs = this.blogsSignal().slice();
    return blogs.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.orderBy() === 'asc' ? dateA - dateB : dateB - dateA;
    });
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.blogsSignal().length / this.pageSize) || 1
  );

  constructor(private blogService: BlogService, private router: Router) {}

  onBlogSelected(blog: IBlog) {
    this.router.navigate(['/blogs', blog.id], { state: { blog } });
  }

}
