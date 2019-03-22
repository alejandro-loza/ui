import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective {
  private shown = false;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.setup();

  }

  setup() {
    const parent = this.renderer.parentNode(this.elementRef.nativeElement);
    const p = this.renderer.createElement('p');
    const label = this.renderer.createElement('label');
    const input = this.renderer.createElement('input');
    const span = this.renderer.createElement('span');

    this.renderer.appendChild(p, label);
    this.renderer.appendChild(label, span);

    this.renderer.setAttribute(input, 'type', 'checkbox');
    this.renderer.addClass(input, 'filled-in');
    this.renderer.addClass(span, 'showPassword');

    this.renderer.insertBefore(label, input, span);
    this.renderer.setProperty(span, 'innerHTML', 'Mostrar Contraseña');

    this.renderer.listen(span, 'click', () => {
      this.toggle(input);
    });

    this.renderer.appendChild(parent, p);
  }
  toggle(input: HTMLElement) {
    this.shown = !this.shown;
    if (this.shown) {
      this.renderer.setAttribute(document.querySelector('input.form-control'), 'type', 'text');
      this.renderer.removeAttribute(input, 'checked');
    } else {
      this.renderer.setAttribute(document.querySelector('input.form-control'), 'type', 'password');
      this.renderer.setAttribute(input, 'checked', 'checked');
    }
  }
}
