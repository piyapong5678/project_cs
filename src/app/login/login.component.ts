
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { LoginDataModel } from '../shared/models/loginData.model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  urlbackend = APP_CONFIG.URL_BACKEND;
  public loginModel!: LoginDataModel;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  constructor(private _dilog: MatDialog, private http: HttpClient,private router: Router) { }

  openRegisterEmForm() {
    const dialogRef = this._dilog.open(RegisterComponent, {
      width: '600px',
    });
  }

  hide = true;

onLogin() {
  const obj = {
    email_user: this.loginForm.value.email,
    password_user: this.loginForm.value.password,
  };

  this.http.post(this.urlbackend + '/api/v1/login', obj).subscribe({
    next: (res: any) => {
  
      if (res.id_user == null) {
        sessionStorage.clear();
        Swal.fire({
          title: 'ไม่พบบัญชีผู้ใช้!',
          text: 'ไม่พบอีเมลนี้ในระบบ กรุณาตรวจสอบอีกครั้ง',
          icon: 'warning',
          confirmButtonText: 'ตกลง'
        });


      } else if (res.status_login) {
  
        sessionStorage.setItem('user', JSON.stringify(res));

        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: 'ยินดีต้อนรับคุณ ' + (res.name_user ? res.name_user : 'ผู้ใช้งาน'),
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {

          this.router.navigate(['home']); 
        });

      
      } else {
        sessionStorage.clear();
        Swal.fire({
          title: 'รหัสผ่านผิด!',
          text: 'กรุณาตรวจสอบรหัสผ่านของคุณใหม่อีกครั้ง',
          icon: 'error',
          confirmButtonText: 'ลองใหม่'
        });
      }
    },
    error: (err) => {
      
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ในขณะนี้',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
      console.error("Login Error:", err);
    }
  });
}
}