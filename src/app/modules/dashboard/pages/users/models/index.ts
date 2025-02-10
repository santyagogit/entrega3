export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    accessToken: string;
    role: 'ADMIN' | 'EMPLOYEE';
}