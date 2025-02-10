import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/components/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses: Course[] = [
    { id: 1, name: 'Angular', description: 'Angular Course' },
    { id: 2, name: 'React', description: 'React Course' },
    { id: 3, name: 'Vue', description: 'Vue Course' },
    { id: 4, name: 'Svelte', description: 'Svelte Course' }
  ];

  updateCourseById(payload: { id: number, name: string, description: string }): Observable<Course[]> {
    const updatedCourses = this.courses.map((course) => {
      if (course.id === payload.id) {
        return { ...course, ...payload };
      }
      return course;
    });
    return of(updatedCourses);
  }

  addCourse(payload: { name: string, description: string }): Observable<Course[]> {
    this.courses.push({ id: this.courses.length + 1, ...payload });
    return this.getCourses();
  }

  getCourses(): Observable<Course[]> {
    return of([...this.courses]).pipe(delay(2000));
  }

  deleteCourseById(id: number): Observable<Course[]> {
    this.courses = this.courses.filter((course) => course.id !== id);
    return this.getCourses();
  }
}
