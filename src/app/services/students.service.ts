import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../modules/dashboard/pages/students/models';

@Injectable({
  providedIn: 'root',
})
class StudentsService {
  private studentUrl = 'assets/students.json';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    console.log('url', this.studentUrl);
    return this.http.get<Student[]>(this.studentUrl);
  }

  getStudentById(id: string): Observable<Student | undefined> {
    return this.http
      .get<Student[]>(this.studentUrl)
      .pipe(map((students) => students.find((student) => student.id === id)));
  }
}
