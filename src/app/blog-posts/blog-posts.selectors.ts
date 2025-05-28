import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as store from './blog-posts.store';

const selectBlogPosts = createFeatureSelector<store.BlogPostState>(
  store.blogPostsFeature.name,
);

export const selectAllBlogPosts = createSelector(selectBlogPosts, (state) => state.loadedPosts);

export const selectAllBlogPostComments = createSelector(selectBlogPosts, (state) => state.blogPostComments);
