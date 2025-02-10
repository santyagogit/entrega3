import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './components/models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  isLoading = false;
  courses: Course[] = [];

  isAdmin$: Observable<boolean>

  constructor(private courseService: CourseService, private matDialog: MatDialog, private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  ngOnInit(): void {
    this.isLoading = true;


    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = [...courses];
        console.log(courses);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onDelete(id: string): void {
    if (confirm("Esta seguro de eliminar el curso?")) {
      this.isLoading = true;
      this.courseService.deleteCourseById(parseInt(id)).subscribe({
        next: (courses) => {
          this.courses = [...courses];
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  openFormDialog(editingCourse?: Course): void {
    this.matDialog.open(CourseFormDialogComponent, { data: { editingCourse } }).afterClosed().subscribe({
      next: (result) => {
        console.log(result);
        if (!!result) {
          if (!!editingCourse) {
            this.updateCourse({ id: editingCourse.id, ...result });
          } else {
            this.addCourse(result);
          }
        }
      }
    });
  }

  updateCourse(data: { id: number, name: string, description: string }): void {
    this.isLoading = true;
    this.courseService.updateCourseById(data).subscribe({
      next: (courses) => {
        this.courses = [...courses];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  addCourse(data: { name: string, description: string }): void {
    this.isLoading = true;
    this.courseService.addCourse(data).subscribe({
      next: (courses) => {
        this.courses = [...courses];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
