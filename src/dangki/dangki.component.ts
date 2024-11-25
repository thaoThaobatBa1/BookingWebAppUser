import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dangki',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './dangki.component.html',
  styleUrl: './dangki.component.scss'
})
export class DangkiComponent {
  registrationData = {
    Email: '',
    Password: '',
  };

  confirmPassword : string = ''

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.registrationData.Password === this.confirmPassword) {
      const registerUrl = 'https://localhost:7097/api/Auth/register';

      this.http.post(registerUrl, this.registrationData,)
        .subscribe((res : any) => {
          if(res.message){
            alert(res.message)
            this.router.navigateByUrl('/login')
          }else{
            alert('Đăng kí thất bại')
          }
        })
        
    } else {
      alert('Mật khẩu xác nhận không khớp!');
    }

}}
