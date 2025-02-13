import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../user.interface';

@Component({
    selector: 'app-delete-user-dialog',
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
    templateUrl: './delete-user-dialog.component.html',
    styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
    readonly data = inject<{user: User}>(MAT_DIALOG_DATA);
    readonly dialog = inject(MatDialog);
    title = 'its title'
    constructor() {

    }

    get userWithDeleteFields () {
        return {
        id: this.data.user.id
        }
    }
}
