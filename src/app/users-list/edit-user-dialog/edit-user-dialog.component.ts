import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef,} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { User, UserFormData } from '../../user.interface';

@Component({
    selector: 'app-edit-user-dialog',
    standalone: true,
    imports: [
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogClose,
        ReactiveFormsModule
    ],
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss',
})

export class EditUserDialogComponent {
    readonly data = inject<{user: User}>(MAT_DIALOG_DATA);

    public form = new FormGroup({
        name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
        companyName: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(2)])
    });

    get userWithUpdateFields (): UserFormData {
        const formValue = this.form.value;
        return {
            id: this.data.user.id,
            name: formValue.name || '',
            email: formValue.email || '',
            website: formValue.website || '',
            companyName: formValue.companyName || ''
        }
    }
}
