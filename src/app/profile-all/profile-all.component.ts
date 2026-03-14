import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileAll } from './profileall-model';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile-all',
  templateUrl: './profile-all.component.html',
  styleUrls: ['./profile-all.component.scss']
})
export class ProfileAllComponent implements OnInit{
  urlbackend = APP_CONFIG.URL_BACKEND;
  ProfileAllList: ProfileAll[] = [];
  originalProfileAllList: ProfileAll[] = [];
  constructor(private http: HttpClient){}

deleteProfile(id_user: String) {
  // 1. แสดง Pop-up ยืนยันก่อนทำการลบจริง
  Swal.fire({
    title: 'ยืนยันการลบสมาชิก?',
    text: "คุณจะไม่สามารถกู้คืนข้อมูลสมาชิกรายนี้ได้!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', // สีแดงสำหรับการลบ
    cancelButtonColor: '#757575',
    confirmButtonText: 'ใช่, ลบเลย!',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    // 2. ถ้าผู้ใช้กดปุ่มยืนยัน
    if (result.isConfirmed) {
      
      // แสดง Loading ขณะรอ Backend ลบข้อมูล
      Swal.fire({
        title: 'กำลังลบข้อมูล...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      // 3. ส่งคำขอ DELETE ไปยัง Backend
      this.http.delete(this.urlbackend + "/api/v1/user/data/" + id_user).subscribe({
        next: (response) => {
          console.log("Delete Success:", response);
          
          // 4. แสดง Pop-up แจ้งลบสำเร็จ
          Swal.fire({
            icon: 'success',
            title: 'ลบข้อมูลสำเร็จ!',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            // รีโหลดหน้าจอเพื่อให้รายการสมาชิกอัปเดต
            window.location.reload();
          });
        },
        error: (err) => {
          // 5. กรณีเกิดข้อผิดพลาดจาก Server
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่สามารถลบข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',
            confirmButtonText: 'ตกลง'
          });
          console.error("Delete Error:", err);
        }
      });
    }
  });
}

  ngOnInit(): void {
    this.http.get<ProfileAll[]>(this.urlbackend +"/api/v1/user")
    .subscribe(response=>{
      console.log(response);
      this.ProfileAllList = response;
      this.originalProfileAllList = response;
    })
  }

  onKeyAll(event: any) {
    this.ProfileAllList = this.originalProfileAllList.filter((data) =>
      data.firstname_user.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }
}
