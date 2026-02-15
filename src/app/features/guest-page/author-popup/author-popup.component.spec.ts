import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { AuthorPopupComponent } from './author-popup.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router'

describe('AuthorPopupComponent', () => {
    let component: AuthorPopupComponent;
    let fixture: ComponentFixture<AuthorPopupComponent>;

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
        fixture = TestBed.createComponent(AuthorPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });
});