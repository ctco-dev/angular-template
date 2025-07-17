import {BlogPostActions} from './blog-posts.actions';
import {IBlogPost} from "./blog-posts.model";
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeature, createReducer, on} from '@ngrx/store';

export interface BlogPostState extends EntityState<IBlogPost> {
  loadedPosts: IBlogPost[]
}

const adapter = createEntityAdapter<IBlogPost>({});

const initialState: BlogPostState = adapter.getInitialState({
  loadedPosts: []
});

export const blogPostsFeature = createFeature({
  name: 'blog-posts',
  reducer: createReducer(
    initialState,
    on(BlogPostActions["blog-posts-fetched"], (currentState, {blogPosts}): BlogPostState => ({...currentState, loadedPosts: blogPosts})),
    on(BlogPostActions["blog-post-fetched"], (currentState, {blogPost}): BlogPostState => {
      let loadedPosts = currentState.loadedPosts;
      const index = loadedPosts.findIndex(post => post.id === blogPost.id);
      if (index !== -1) {
        loadedPosts[index] = blogPost;
      } else {
        loadedPosts = [...loadedPosts, blogPost];
      }
      return ({...currentState, loadedPosts});
    }),
    on(BlogPostActions["blog-post-comments-fetched"], (currentState, {blogPostId, blogPostComments}): BlogPostState => {
      const loadedPosts = currentState.loadedPosts.map(post => {
        if (post.id == blogPostId) return {...post, comments: blogPostComments}
        return post;
      });
      return ({...currentState, loadedPosts});
    }),
  ),
});
