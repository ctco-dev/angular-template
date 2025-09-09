import { ElementRef, Renderer2, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GravatarDirective } from './gravatar.directive';

@Component({
  template: `
    <img
      appGravatar
      [email]="email"
    />
  `,
  imports:[GravatarDirective]
})
class TestGravatarComponent {
  email!: string;
}

describe('GravatarDirective', () => {
  let component: TestGravatarComponent;
  let fixture: ComponentFixture<TestGravatarComponent>;
  let imgDebug: DebugElement;
  let imgElement: HTMLElement;
  let gravatarDir: GravatarDirective;

  beforeEach(() => {
    const elementRef = jasmine.createSpyObj('elementRef', ['nativeElement']);
    const renderer = jasmine.createSpyObj('renderer', ['setStyle', 'setProperty', 'listen']);

    TestBed.configureTestingModule({
      imports: [GravatarDirective, TestGravatarComponent],
      providers: [
        GravatarDirective,
        { provide: ElementRef, useValue: elementRef },
        { provide: Renderer2, useValue: renderer },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    spyOn(console, 'error');
    fixture = TestBed.createComponent(TestGravatarComponent);
    component = fixture.componentInstance;

    imgDebug = fixture.debugElement.query(By.css('img'));
    imgElement = imgDebug.nativeElement;

    gravatarDir = TestBed.inject(GravatarDirective);
  });

  it('with email, should produce gravatar url', () => {
    // arrange, act
    component.email = 'test@test.api.com';
    fixture.detectChanges();
    // assert
    expect(imgElement.getAttribute('src'))
      .toBe('//www.gravatar.com/avatar/5f7d3b474d46d5bbb9a5bfc3f1a38a32?d=monsterid&s=40');
  });

    it('with no email, should produce empty gravatar url', () => {
    // arrange, act
    component.email = '';
    fixture.detectChanges();
    // assert
    expect(imgElement.getAttribute('src'))
      .toBe('//www.gravatar.com/avatar/');
  });
});
