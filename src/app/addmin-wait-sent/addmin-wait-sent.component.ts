import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addmin-wait-sent',
  templateUrl: './addmin-wait-sent.component.html',
  styleUrls: ['./addmin-wait-sent.component.scss']
})
export class AddminWaitSentComponent implements OnInit{

  SendList: Sent[] = [];
  urlbackend = APP_CONFIG.URL_BACKEND;
  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/addmin3').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      
    });
  }

onSummitSend(id_send: String) {
  
  Swal.fire({
    title: 'ยืนยันการจัดส่งสินค้า?',
    text: "คุณเตรียมสินค้าและพร้อมส่งมอบให้บริษัทขนส่งแล้วใช่หรือไม่?",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6', 
    cancelButtonColor: '#757575',
    confirmButtonText: 'ยืนยันการส่งสินค้า',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    
    if (result.isConfirmed) {
      
  
      Swal.fire({
        title: 'กำลังอัปเดตสถานะ...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      let data = {
        status_send: "4", 
      };

      this.http.put(this.urlbackend + '/api/v1/send/data/' + id_send, data).subscribe({
        next: (response) => {
      
          Swal.fire({
            icon: 'success',
            title: 'จัดส่งสำเร็จ!',
            text: 'ระบบได้เปลี่ยนสถานะเป็น "จัดส่งสินค้าแล้ว"',
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
            text: 'ไม่สามารถอัปเดตสถานะการจัดส่งได้ กรุณาลองใหม่อีกครั้ง',
            confirmButtonColor: '#f44336'
          });
          console.error(err);
        }
      });
    }
  });
}
}
