import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  isPasswordVisible = false;

  constructor(private http: HttpClient, private router: Router) { }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      const loginUrl = 'https://localhost:7097/api/Auth/login';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.http.post(loginUrl, this.loginData).subscribe((res: any) => {
        if (res.token) {
          alert("Đăng nhập thành công")
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', this.loginData.email);
          }

          this.router.navigateByUrl('/layout/trangchu')

        } else {
          alert("Đăng nhập thất bại")
        }
      })
    }
  }
}
