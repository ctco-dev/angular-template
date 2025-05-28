import {BlogPostActions} from './blog-posts.actions';
import {IBlogPost, IBlogPostComment} from "./blog-posts.model";
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeature, createReducer, on} from '@ngrx/store';

export interface BlogPostState extends EntityState<IBlogPost> {
  loadedPosts: IBlogPost[];
  activeBlogPost: number | undefined;
  blogPostComments: Map<number, IBlogPostComment[]>;
}

const adapter = createEntityAdapter<IBlogPost>({});

const initialState: BlogPostState = adapter.getInitialState({
  loadedPosts: [],
  activeBlogPost: undefined,
  blogPostComments: new Map()
});

export const blogPostsFeature = createFeature({
  name: 'blog-posts',
  reducer: createReducer(
    initialState,
    on(BlogPostActions["blog-post-opened"], (currentState, {blogPostId}): BlogPostState => ({
      ...currentState,
      activeBlogPost: blogPostId
    })),
    on(BlogPostActions["blog-posts-fetched"], (currentState, {blogPosts}): BlogPostState => ({
      ...currentState,
      loadedPosts: blogPosts
    })),
    on(BlogPostActions["blog-post-comments-fetched"], (currentState, {blogPostComments, id}): BlogPostState => ({
      ...currentState,
      blogPostComments: currentState.blogPostComments.set(id, blogPostComments),
    })),
  ),
});
