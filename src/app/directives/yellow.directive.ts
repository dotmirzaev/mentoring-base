import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[yellow]',
    standalone: true,
})

export class YellowDirective {
    color = 'inherit'


    @HostBinding('style.backgroundColor')
    get backgroundColor() {
        return this.color
    }


    @HostListener('mouseenter')
    enter() {
        this.color = '#F0BA4E';
        console.log('yellow');
    }

    @HostListener('mouseleave')
    leave() {
        this.color = '#4B565E';
        console.log('white')
    }
}
