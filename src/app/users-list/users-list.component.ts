import { NgFor, AsyncPipe } from "@angular/common";
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { User } from "../user.interface";


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService)
    readonly usersService = inject(UsersService)
    readonly dialog = inject(MatDialog)
    readonly snackBar = inject(MatSnackBar)

    constructor() {
        this.usersApiService.getUsers().subscribe((respons: User[]) => {
            this.usersService.setUsers(respons);
        });

        this.usersService.users$.subscribe((user: User) => console.log(user));
    };

    deleteUser(id: number) {
        this.usersService.deleteUser(id);
    };

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateUserDialogComponent);

        dialogRef.afterClosed().subscribe((createResult) => {
            if (createResult) {
                this.usersService.createUser({
                id: new Date().getTime(),
                name: createResult.name,
                email: createResult.email,
                company: {
                    name: createResult.companyName,
                },
                website: createResult.website,
                });
                this.snackBar.open('Пользователь успешно создан!', 'Ок', {
                duration: 3000
                })
            }else {
                this.snackBar.open('Ошибка! Пользователь не создан', 'Ок', {
                duration: 3000
                })
            }
        })
    };

    editUser(user: any) {
        this.usersService.editUser({
            ...user,
            company: {
                name: user.companyName,
            }
        })
    }
}
