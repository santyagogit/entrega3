import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private apiUrl = 'https://api.example.com/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}
