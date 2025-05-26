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
  blogs: IBlog[] = [];
  constructor(private blogService: BlogService, private router: Router) {
    this.blogService.getBlogs().subscribe((data: any) => {
      this.blogs = data;
    });
  }

  onBlogSelected(blog: IBlog) {
    console.log('Selected blog:', blog);
    this.router.navigate(['/blogs', blog.id], { state: { blog } });
  }

}
