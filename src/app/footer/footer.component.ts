import { Component } from '@angular/core';
import { RemoveDashesPipe } from '../pipes/remove-dashes.pipe';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
    imports: [RemoveDashesPipe]
})

export class FooterComponent {}