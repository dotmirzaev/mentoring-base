import { AsyncPipe, NgFor, NgIf, DatePipe } from "@angular/common";
import { Component, inject, isStandalone } from "@angular/core";
import { RouterLink } from "@angular/router";
import { YellowDirective } from "../directives/yellow.directive";
import { MatDialog } from "@angular/material/dialog";
import { AuthComponent } from "../auth/auth.component";
import { UserService } from "../user.service";

const menuItems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

const upperCaseMenuItems = menuItems.map (
    (item) => {
        return item.toUpperCase();
    }
)

// const upperCaseNames = names.map (
//   (name) => {
//     console.log(name.toUpperCase());
//     return name.toUpperCase();
//   }
// )



@Component({
    selector: 'app-header',
    imports: [NgFor, NgIf, RouterLink, DatePipe, YellowDirective, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
})

export class HeaderComponent {

    private readonly dialog = inject(MatDialog);
    public readonly userService = inject (UserService)

    public openDialog(): void {
        const dialogRef = this.dialog.open(AuthComponent, {
            width: "400px",
            height: "200px"
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            result === 'admin' ? this.userService.loginAsAdmin() :
            result === 'user' ? this.userService.loginAsUser() : null;
        });
    }

    public logout() {
        return confirm('Вы точно хотите выйти?') ? this.userService.logout() : false;
    }


    isShowCatalog = true;

    readonly aboutCompany = 'О компании'

    readonly isUpperCaseMenu = upperCaseMenuItems;

    readonly headerItem1 = 'Главная';

    readonly headerItem2 = 'О компании';

    readonly headerItem3 = 'Каталог';

    readonly headerItem4 = 'Пользователи'

    readonly headerItem5 = 'Todos';

    readonly headerItem6 = 'Admin'

    readonly header2Item1 = 'Каталог';

    readonly header2Item2 = 'Стройматериалы';

    readonly header2Item3 = 'Инструменты';

    readonly header2Item4 = 'Электрика';

    readonly header2Item5 = 'Интерьер и одежда';

    menuItems = upperCaseMenuItems;

    readonly today: Date = new Date();

    isUpperCase = false;

    changeMenuText() {
        this.menuItems = upperCaseMenuItems.map(
        item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase ()
        )
    this.isUpperCase = !this.isUpperCase
    }
}
