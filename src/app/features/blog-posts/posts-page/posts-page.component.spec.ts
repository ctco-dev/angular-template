import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { PostsPageComponent } from './posts-page.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('PostsPageComponent', () => {
    let component: PostsPageComponent;
    let fixture: ComponentFixture<PostsPageComponent>;

    const initialState = {
        posts: {
            entities: {},
            ids: [],
            loading: false,
            error: null
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({initialState})
            ]
        });
        fixture = TestBed.createComponent(PostsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});