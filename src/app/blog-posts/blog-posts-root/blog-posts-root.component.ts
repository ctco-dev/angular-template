import {Component, inject, OnInit} from '@angular/core';
import {BlogPostsContainerComponent} from "../blog-posts-container/blog-posts-container.component";
import {Store} from "@ngrx/store";
import {BlogPostState} from "../blog-posts.store";
import {BlogPostActions} from "../blog-posts.actions";
import {selectAllBlogPosts} from "../blog-posts.selectors";

@Component({
  selector: 'app-blog-posts',
  imports: [BlogPostsContainerComponent],
  templateUrl: './blog-posts-root.component.html',
  styleUrl: './blog-posts-root.component.scss'
})
export class BlogPostsRootComponent implements OnInit {
  private store = inject(Store<BlogPostState>);
  blogPosts = this.store.selectSignal(selectAllBlogPosts);

  ngOnInit(): void {
    this.store.dispatch(BlogPostActions["page-opened"]());
  }
}
