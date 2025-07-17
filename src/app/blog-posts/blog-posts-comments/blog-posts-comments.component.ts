import {Component, inject, OnInit} from '@angular/core';
import {BlogPostActions} from "../blog-posts.actions";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {selectBlogPostById} from "../blog-posts.selectors";
import {BlogPostsContainerComponent} from "../blog-posts-container/blog-posts-container.component";

@Component({
  selector: 'app-blog-posts-comments',
  imports: [
    BlogPostsContainerComponent
  ],
  templateUrl: './blog-posts-comments.component.html',
  styleUrl: './blog-posts-comments.component.scss'
})
export class BlogPostsCommentsComponent implements OnInit {

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private blogPostId!: number;

  blogpost = this.store.selectSignal((state) => selectBlogPostById(state, {blogPostId: this.blogPostId}));

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogPostId = params['id'];
      this.store.dispatch(BlogPostActions["blog-post-opened"]({blogPostId: this.blogPostId}))
    });
  }
}
