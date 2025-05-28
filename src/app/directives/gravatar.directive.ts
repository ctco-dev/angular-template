import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Md5 } from 'ts-md5';

@Directive({
  selector: '[appGravatar]',
  standalone: true,
})
export class GravatarDirective implements OnInit {
  @Input() set email(value: string) {
    this.internalEmail = value;
    this.updateGravatar(value);
  }
  private internalEmail?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.el && this.internalEmail) {
      this.updateGravatar(this.internalEmail);
    }
    else if(this.el) {
      this.renderer.setAttribute(
        this.el.nativeElement,
        "src",
        `//www.gravatar.com/avatar/`
      );
    }
  }

  private hashString(input: string): string {
    return Md5.hashStr(input.trim().toLocaleLowerCase());
  }

  updateGravatar(email: string): void {
    if (!email || !this.el.nativeElement) {
      return;
    }

    const emailHash = this.hashString(email);

    this.renderer.setAttribute(
      this.el.nativeElement,
      "src",
      `//www.gravatar.com/avatar/${emailHash}?d=wavatar`
    );
  }
}
