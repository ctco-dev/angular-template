import {BlogPostActions} from './blog-posts.actions';
import {IBlogPost} from "./blog-posts.model";
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeature, createReducer, on} from '@ngrx/store';

export interface BlogPostStore extends EntityState<IBlogPost> {
  loadedPosts: IBlogPost[];
}

const adapter = createEntityAdapter<IBlogPost>({});

const initialState: BlogPostStore = adapter.getInitialState({
  loadedPosts: []
});

export const blogPostsFeature = createFeature({
  name: 'blog-posts',
  reducer: createReducer(
    initialState,
    on(BlogPostActions["blog-posts-fetched"], (currentState, {blogPosts}): BlogPostStore => ({
      ...currentState,
      loadedPosts: blogPosts
    })),
  ),
});

const {selectAll} = adapter.getSelectors();

export const selectPosts = selectAll;
