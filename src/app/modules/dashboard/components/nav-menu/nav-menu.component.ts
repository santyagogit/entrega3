import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: false,

  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  linkItems: { label: string, path: string }[] = [
    { label: 'Home', path: 'home' },
    { label: 'Students', path: 'students' },
    { label: 'Courses', path: 'courses' },
    { label: 'Users', path: 'users' },
  ]

  constructor(private router: Router, private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}
