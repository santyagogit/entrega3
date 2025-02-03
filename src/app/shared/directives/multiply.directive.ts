import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMultiply]',
  standalone: false,
})
export class MultiplyDirective {
  @Input()
  appMultiply? = 3;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<unknown>,
  ) {
    this.updateViewContainer();
  }

  updateViewContainer(): void {
    this.viewContainerRef.clear();
    for (let i = 0; i < (this.appMultiply || 3); i++) {
      console.log('Repetir');

      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
