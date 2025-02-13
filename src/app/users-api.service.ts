import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.interface";

@Injectable({providedIn: 'root'})
export class UsersApiService {
    readonly apiService = inject(HttpClient);

    getUsers() {
        return this.apiService.get<User[]>('https://jsonplaceholder.typicode.com/users')
    }
}
