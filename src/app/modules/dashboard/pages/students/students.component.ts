import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Students } from './models';
import { IdGenerator } from '../../../../shared/utils/IdGenerator';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  studentsForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'lastName', 'actions'];

  readonly idGen = new IdGenerator();
  students: Students[] = [
    {
      id: this.idGen.generateUniqueId(),
      name: 'Jill',
      lastName: 'Valentine'
    },

    {
      id: this.idGen.generateUniqueId(),
      name: 'Chris',
      lastName: 'Redfield'
    }
  ];

  editingStudentId?: string | null = null;

  constructor(private fb: FormBuilder, private matDialog: MatDialog) {
    this.studentsForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    })
  }

  onSubmit() {
    if (this.studentsForm.invalid) {
      this.studentsForm.markAllAsTouched();
    }
    else {
      if (!!this.editingStudentId) {
        this.students = this.students.map((st) => st.id === this.editingStudentId ?
          { ...st, ...this.studentsForm.value }
          : st);
        this.editingStudentId = null;
      }
      else {
        console.log("else");
        this.students = [
          ...this.students,
          {
            id: this.idGen.generateUniqueId(),
            ...this.studentsForm.value
          }
        ]
      }
      this.studentsForm.reset();
    }
  }

  onDelete(id: string) {
    if (confirm("Esta seguro?")) {
      this.students = this.students.filter(el => el.id != id);
    }
  }

  onColorUpdated() {
    console.log("Color updated");
  }

  onEdit(student: Students): void {
    console.log("Estudiante", student);

    this.editingStudentId = student.id;

    this.studentsForm.patchValue({
      name: student.name,
      lastName: student.lastName
    })
  }

  onCreateStudent(): void {
    this.matDialog.open(StudentDialogFormComponent);

  }
}
