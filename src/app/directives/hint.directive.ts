import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive ({
    selector: '[hint]',
    standalone: true
})

export class hintDirective {

    @HostBinding('style.hint')
    shadow = '';

    @HostListener('mouseenter')
    enter() {
        this.shadow = '0px 8px 10px rgba(0, 0, 0, 0.5)'
    }

    @HostListener('mouseleave')
    leave() {
        this.shadow = ''
    }

}
