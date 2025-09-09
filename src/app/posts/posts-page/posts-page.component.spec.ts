import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PostsPageActions } from '../state/posts.actions';
import { PostsPageComponent } from './posts-page.component';

describe('PostsPageComponent', () => {
  let store: MockStore;
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [PostsPageComponent],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should dispatch page opened action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(PostsPageActions.pageOpened());
  });
});
