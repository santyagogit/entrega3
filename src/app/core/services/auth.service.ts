import { Injectable } from "@angular/core";
import { LoginPayload } from "../../modules/auth/models";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../../modules/dashboard/pages/users/models";

const users_data = [
    {
        id: 1,
        email: 'admin@email.com',
        password: 'admin',
        name: 'Admin',
        accessToken: 'admin-token',
        role: 'ADMIN' as 'ADMIN'
    },
    {
        id: 2,
        email: 'employee@email.com',
        password: 'employee',
        name: 'Employee',
        accessToken: 'employee-token',
        role: 'EMPLOYEE' as 'EMPLOYEE'
    }
]

@Injectable({ providedIn: "root" })
export class AuthService {


    private _authUser$ = new BehaviorSubject<User | null>(null);

    authUser$ = this._authUser$.asObservable();

    constructor(private router: Router) {
    }

    get isAdmin$(): Observable<boolean> {
        return this.authUser$.pipe(map(user => user?.role === 'ADMIN'))
    }

    login(payload: LoginPayload): void {
        let loginResult = users_data.find(user => user.email === payload.email && user.password === payload.password);

        if (loginResult) {
            localStorage.setItem('authUser', loginResult.accessToken);
            console.log('authUser');
            this._authUser$.next(loginResult);
            this.router.navigate(['dashboard', 'home']);
        } else {
            alert('Invalid email or password');
        }
    }

    logout(): void {
        localStorage.removeItem('authUser');
        this._authUser$.next(null);
        this.router.navigate(['auth', 'login']);
    }

    isAuthenticated(): Observable<boolean> {

        const token = localStorage.getItem('authUser');
        const accesToken = users_data.find(user => user.accessToken === token)
        this._authUser$.next(accesToken || null);
        return this.authUser$.pipe(map(user => !!user));
    }
}