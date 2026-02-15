import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { PostDetailsPageComponent } from './post-details-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router'

describe('PostDetailsPage', () => {
    let component: PostDetailsPageComponent;
    let fixture: ComponentFixture<PostDetailsPageComponent>;

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
                provideMockStore({initialState}),
                provideRouter([])
            ]
        });
        fixture = TestBed.createComponent(PostDetailsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});