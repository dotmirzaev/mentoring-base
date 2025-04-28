import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'users', component: UsersListComponent},
    {path: 'todos', component: TodosListComponent},
    {path: 'admin', component: AdminComponent}
];
