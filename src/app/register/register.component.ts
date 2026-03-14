import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  urlbackend = APP_CONFIG.URL_BACKEND;
  regisForm  = new FormGroup({
    
    firstname_user: new FormControl('', Validators.required),
    lastname_user: new FormControl('', Validators.required),
    phone_user: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    email_user: new FormControl('', [Validators.required, Validators.email]),
    password_user: new FormControl('', Validators.required),
    status_user: new FormControl('ลูกค้า'),
  });

  constructor(private http: HttpClient){}

onSubmit() {
  const obj = this.regisForm.value;

  
  Swal.fire({
    title: 'กำลังตรวจสอบข้อมูล...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  this.http.post(this.urlbackend + '/api/v1/user/data', obj).subscribe({
    next: (res: any) => {
      
      if (res == null) {
        Swal.fire({
          icon: 'error',
          title: 'อีเมลนี้ถูกใช้งานแล้ว!',
          text: 'กรุณาใช้ชื่ออีเมลอื่นในการสมัครสมาชิก',
          confirmButtonText: 'ตกลง'
        });
      } else {
      
        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ!',
          text: 'ยินดีต้อนรับคุณ ' + res.firstname_user,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
        
          window.location.reload(); 
        });
      }
    },
    error: (err) => {
   
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ในขณะนี้',
      });
    }
  });
}
  hide = true;
}
