import { Injectable } from "@angular/core";
import { Student } from "../../modules/dashboard/pages/students/models";
import { delay, interval, Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class StudentsService {
    getStudentsPromise(): Promise<Student[]> {
        return new Promise<Student[]>((resolve, reject) => {
            setTimeout(() => {

                reject(new Error("Error fetching students"));

                resolve([
                    { id: "1", name: "John", lastName: "Doe" },
                    { id: "2", name: "Jane", lastName: "Doe" },
                    { id: "3", name: "John", lastName: "Smith" },
                    { id: "4", name: "Jane", lastName: "Smith" },
                ]);
            }, 3000);
        });
    }

    getStudentsObservable(): Observable<Student[]> {
        return new Observable<Student[]>((subscriber) => {

            const students = [
                { id: "1", name: "John", lastName: "Doe" },
                { id: "2", name: "Jane", lastName: "Doe" },
                { id: "3", name: "John", lastName: "Smith" },
                { id: "4", name: "Jane", lastName: "Smith" },
            ]

            setInterval(() => {
                students.push({ id: (students.length + 1).toString(), name: "John", lastName: "Doe" });

                subscriber.next(students);
                // subscriber.error(new Error("Error fetching students"));
                // subscriber.complete();
            }, 5000);
        });
    }

    getInterval(): Observable<number> {
        return interval(1000);
    }

    getRoles(): Observable<string[]> {
        return of(["admin", "student", "user"]).pipe(delay(1000));
    }

    getFruits(): Observable<string[]> {
        return of(["apple", "banana", "orange"]).pipe(delay(3000));
    }
}