import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: false,

  templateUrl: './student-detail.component.html',
  styles: ``
})
export class StudentDetailComponent {

  studentId: string = '';
  fullName: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute);

    this.studentId = this.activatedRoute.snapshot.params['id'];
    this.fullName = this.activatedRoute.snapshot.queryParams['name'] + ' ' + this.activatedRoute.snapshot.queryParams['lastName'];
  }
}
