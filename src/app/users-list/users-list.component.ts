import { NgFor, AsyncPipe } from "@angular/common";
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { User, CreateUserFormData } from "../user.interface";
import { Store } from "@ngrx/store";
import { UserActions } from "./store/users.actions";
import { selectorUsers } from "./store/users.selectors";


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
    private readonly store = inject (Store)
    public readonly users$ = this.store.select(selectorUsers);

    constructor() {
        this.usersApiService.getUsers().subscribe((responce: User[]) => {
            this.usersService.setUsers(responce);
            this.store.dispatch(UserActions.set({ users: responce}));
        });

        this.usersService.users$.subscribe((users: User[]) => console.log(users));
    };

    deleteUser(id: number) {
        this.usersService.deleteUser(id);
        this.store.dispatch(UserActions.delete({ id }));
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

    editUser(user: User) {
        this.usersService.editUser({
            ...user,
            company: {
                name: user.company.name,
            }
        });
        this.store.dispatch(UserActions.edit({ user }));
    }

    public createUser(formData: CreateUserFormData) {

        this.store.dispatch(
            UserActions.create({
                user: {
                    id: new Date().getTime(),
                    name: formData.name,
                    email: formData.email,
                    website: formData.website,
                    company: {
                        name: formData.companyName,
                    }
                }
            })
        )
    }
}

