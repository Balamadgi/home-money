
import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[myfDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open')  private isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
