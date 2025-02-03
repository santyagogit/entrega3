import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appSize20]',
  standalone: false,
})
export class Size20Directive implements OnChanges {
  constructor(private elementRef: ElementRef) {
    this.setFontSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appSize20']) {
      this.setFontSize();
    }
  }

  private setFontSize(): void {
    this.elementRef.nativeElement.style.fontSize = '20px';
  }
}
