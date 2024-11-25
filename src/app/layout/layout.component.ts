import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  username: string | null = null
  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      this.username = localStorage.getItem('username');
    }
  }

  logout() {
    this.username = null
    localStorage.removeItem('username')
    localStorage.removeItem('token')

    this.router.navigateByUrl('/');

  }


}
