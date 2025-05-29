import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as store from './blog-posts.store';
import {BlogPostState} from "./blog-posts.store";

const selectBlogPosts = createFeatureSelector<store.BlogPostState>(
  store.blogPostsFeature.name,
);

export const selectAllBlogPosts = createSelector(selectBlogPosts, (state) => state.loadedPosts);

export const selectBlogPostById = createSelector(selectBlogPosts, (state: BlogPostState, props: { blogPostId: number }) => {
  return state.loadedPosts.filter(post => post.id === props.blogPostId).pop();
});
