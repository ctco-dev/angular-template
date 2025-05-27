import { Component } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog } from './blog.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  readonly blogs$ = this.blogService.blogs$;
  constructor(private blogService: BlogService, private router: Router) { }

  onBlogSelected(blog: IBlog) {
    this.router.navigate(['/blogs', blog.id], { state: { blog } });
  }

}
