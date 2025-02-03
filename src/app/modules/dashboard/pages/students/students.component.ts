import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { IdGenerator } from '../../../../shared/utils/IdGenerator';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { StudentsService } from '../../../../core/services/students.service';
import { concatMap, first, forkJoin, interval, map, Observable, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  studentsForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];

  students: Student[] = [];
  selectedStudent!: Student;

  editingStudentId?: string | null = null;

  readonly idGen = new IdGenerator();
  isLoading = false;
  hasError = false;

  studentsSubscription?: Subscription;

  rolesAndFruits$: Observable<string[]> | undefined;
  myIntervals$ = interval(2000);

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentsService: StudentsService,
  ) {
    this.studentsForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.loadStudentsPromise();
    // this.loadStudentsObersavable();
    // this.subscribeToInterval();
    // this.loadFrutasAndRoles();
    // this.loadFrutasWithRoles();
    this.rolesAndFruits$ = this.studentsService.getRoles().pipe(
      concatMap((roles) => this.studentsService.getFruits()
        .pipe(
          map(fruits => [...roles, ...fruits])
        )));
  }

  subscribeToInterval(): void {
    this.studentsService.getInterval()
      .pipe(
        take(5), map((value) => value * 2), tap((value) => console.log(value))
      )
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        }
      })
  }

  loadFrutasAndRoles(): void {
    this.isLoading = true;

    forkJoin([
      this.studentsService.getRoles(),
      this.studentsService.getFruits()
    ]).subscribe({
      next: ([roles, fruits]) => {
        console.log(roles, fruits);
      },
      error: (error) => {
        console.log(error);
        this.hasError = true;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  // loadFrutasWithRoles(): void {
  //   this.studentsService.getRoles().pipe(
  //     concatMap((roles) => this.studentsService.getFruits()
  //       .pipe(
  //         map(fruits => [...roles, ...fruits])
  //       )))
  //     .subscribe({
  //       next: (result) => {
  //         console.log(result);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //         this.hasError = true;
  //       },
  //       complete: () => {
  //         this.isLoading = false;
  //       }
  //     });
  // }

  loadStudentsPromise() {
    this.isLoading = true;
    this.studentsService.getStudentsPromise().then((students) => {
      this.students = students;
    }).catch((error) => { console.log(error); this.hasError = true; })

      .finally(() => {
        this.isLoading = false;
      });
  }

  loadStudentsObersavable() {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService
      .getStudentsObservable()
      .pipe(
        first(),
      )
      .subscribe({
        next: (students) => {
          this.students = [...students];
          this.isLoading = false;
          console.log(students);
        },
        error: (error) => { alert('error'); this.hasError = true; },
        complete: () => {
          // this.hasError = true;
          this.isLoading = false;
        },
      })
  }

  onSubmit() {
    if (this.studentsForm.invalid) {
      this.studentsForm.markAllAsTouched();
    } else {
      if (!!this.editingStudentId) {
        this.students = this.students.map((st) =>
          st.id === this.editingStudentId
            ? { ...st, ...this.studentsForm.value }
            : st,
        );
        this.editingStudentId = null;
      } else {
        console.log('else');
        this.students = [
          ...this.students,
          {
            id: this.idGen.generateUniqueId(),
            ...this.studentsForm.value,
          },
        ];
      }
      this.studentsForm.reset();
    }
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((student) => student.id != id);
    }
  }

  getStudentDetails(id: string) {
    //   this.studentService.getStudentById(id).subscribe((student) => {
    //     student && (this.selectedStudent = student);
    //   });
  }

  onColorUpdated() {
    console.log('Color updated');
  }

  onEdit(student: Student): void {
    console.log('Estudiante', student);

    this.editingStudentId = student.id;

    this.studentsForm.patchValue({
      name: student.name,
      lastName: student.lastName,
    });
  }

  onCreateStudent(): void {
    this.matDialog.open(StudentDialogFormComponent);
  }
}
