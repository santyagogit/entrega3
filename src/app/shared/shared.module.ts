import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { Size20Directive } from './directives/size20.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    HighlightDirective,
    MultiplyDirective,
    Size20Directive
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe, HighlightDirective, MultiplyDirective, Size20Directive
  ]
})
export class SharedModule { }
