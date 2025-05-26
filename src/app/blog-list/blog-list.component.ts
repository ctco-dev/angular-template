import { Component } from '@angular/core';
import { BlogService } from './blog.service';
import { IBlog } from './message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  blogs: IBlog[] = [];
  constructor(private blogService: BlogService) {
    this.blogService.getBlogs().subscribe((data: any) => {
      this.blogs = data;
    });
  }

}
