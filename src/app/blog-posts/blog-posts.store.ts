import {BlogPostActions} from './blog-posts.actions';
import {IBlogPost} from "./blog-posts.model";
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeature, createReducer, on} from '@ngrx/store';
import {State} from "../reducers";

export interface BlogPostStore extends EntityState<IBlogPost> {
  loadedPosts: IBlogPost[];
}

const adapter = createEntityAdapter<IBlogPost>({});

export const blogPostsFeature = createFeature({
  name: 'blog-posts',
  reducer: createReducer(
    {},
    on(BlogPostActions["blog-posts-fetched"], (currentState, {blogPosts}): State => ({
      ...currentState,
      blogPosts
    })),
  ),
});

const {selectAll} = adapter.getSelectors();

export const selectPosts = selectAll;
