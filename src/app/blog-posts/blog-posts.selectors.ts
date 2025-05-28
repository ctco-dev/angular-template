import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as store from './blog-posts.store';

const selectBlogPosts = createFeatureSelector<store.BlogPostStore>(
  store.blogPostsFeature.name,
);

export const selectAllBlogPosts = createSelector(selectBlogPosts, (state) => state.loadedPosts);
