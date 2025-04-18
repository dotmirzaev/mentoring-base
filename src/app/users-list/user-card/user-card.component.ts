import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { hintDirective } from "../../directives/hint.directive";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: "app-user-card",
    templateUrl: "./user-card.component.html",
    styleUrls: ["./user-card.component.scss"],
    standalone : true,
    imports: [hintDirective, MatTooltipModule]
})

export class UserCardComponent {
    @Input()
    user: any

    @Output()
    deleteUser = new EventEmitter();

    @Output()
    eidtUser = new EventEmitter();

    readonly dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar)
    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
        data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe((editResult) => {
        if (editResult) {
            this.eidtUser.emit(editResult);
            this.snackBar.open('Данные пользователя успешно обновлены!', 'Ok', {
            duration: 3000
            })
        }else {
            this.snackBar.open('Ошибка при обновлении данных!', 'Ok', {
            duration: 3000
            })
        }

        });
    }

    openDeleteDialog(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe((deleteResult) => {
            console.log('Значение формы: ', deleteResult);
            if (deleteResult) {
                this.deleteUser.emit(deleteResult.id);
                this.snackBar.open('Пользователь успешно удален!', 'Ok', {
                    duration: 3000
                })
            }else {
                this.snackBar.open('Ошибка при удалении пользователя!', 'Ok', {
                    duration: 3000
                })
            }
        });
    }
}
