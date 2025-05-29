import { TestBed } from '@angular/core/testing';
import { PostsPageComponent } from './posts-page.component';

describe('PostsPageComponent', () => {
    it('should contain header Blog posts', () => {
        const fixture = TestBed.createComponent(PostsPageComponent);
        
        const component = fixture.componentInstance;
        jasmine.createSpy('Store')
        expect(component).toBeTruthy();
    });
});