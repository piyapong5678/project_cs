import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmin-cancel',
  templateUrl: './addmin-cancel.component.html',
  styleUrls: ['./addmin-cancel.component.scss']
})
export class AddminCancelComponent implements OnInit{

  SendList: Sent[] = [];
  urlbackend = APP_CONFIG.URL_BACKEND;
  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/addmin0').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      
    });
  }

deleteOrder(id_send: String) {
  
  Swal.fire({
    title: 'ยืนยันการลบคำสั่งซื้อ?',
    text: "คุณต้องการลบข้อมูลคำสั่งซื้อนี้ใช่หรือไม่? (การลบนี้จะไม่สามารถกู้คืนได้)",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', 
    cancelButtonColor: '#757575',
    confirmButtonText: 'ใช่, ลบรายการ!',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {

    if (result.isConfirmed) {
      

      Swal.fire({
        title: 'กำลังลบข้อมูล...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      this.http.delete(this.urlbackend + "/api/v1/send/data/" + id_send).subscribe({
        next: (response) => {
        
          Swal.fire({
            icon: 'success',
            title: 'ลบข้อมูลสำเร็จ!',
            text: 'คำสั่งซื้อถูกลบออกจากระบบแล้ว',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            window.location.reload(); 
          });
        },
        error: (err) => {
      
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่สามารถลบข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',
            confirmButtonColor: '#f44336'
          });
          console.error(err);
        }
      });
    }
  });
}
}
