import { Injectable } from '@angular/core';
import { concatMap, delay, Observable, of } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/components/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses: Course[] = [
    { id: "1", name: 'Angular' },
    { id: "2", name: 'React' },
    { id: "3", name: 'Vue' },
    { id: "4", name: 'Svelte' }
  ];

  constructor(private httpClient: HttpClient) { };

  getCourseDetail(id: string): Observable<Course> {
    return this.httpClient.get<Course>(environment.baseApiUrl + "/courses/" + id + "?_embed=teachers")
  }

  updateCourseById(payload: { id: string, name: string }): Observable<Course[]> {
    // const updatedCourses = this.courses.map((course) => {
    //   if (course.id === payload.id) {
    //     return { ...course, ...payload };
    //   }
    //   return course;
    // });
    // return of(updatedCourses);

    return this.httpClient
      .patch<Course>(environment.baseApiUrl + "/courses/" + payload.id, { ...payload })
      .pipe(
        concatMap(() => this.getCourses())
      );
  }

  addCourse(payload: { name: string }): Observable<Course[]> {
    // this.courses.push({ id: (this.courses.length + 1).toString(), ...payload });
    // return this.getCourses();

    return this.httpClient
      .post<Course>(environment.baseApiUrl + "/courses/", payload)
      .pipe(
        concatMap(() => this.getCourses())
      )
  }

  getCourses(): Observable<Course[]> {
    // return of([...this.courses]).pipe(delay(2000));
    localStorage.getItem('authUser');
    const myHeaders = new HttpHeaders().append('Authorization', localStorage.getItem('authUser') || '');
    console.log(myHeaders);

    return this.httpClient.get<Course[]>(environment.baseApiUrl + "/courses", {
      headers: myHeaders
    });
  }

  deleteCourseById(id: string): Observable<Course[]> {
    // this.courses = this.courses.filter((course) => course.id !== id);
    return this.httpClient.delete<Course>(environment.baseApiUrl + "/courses/" + id)
      .pipe(concatMap(() => this.getCourses()));
  }
}
