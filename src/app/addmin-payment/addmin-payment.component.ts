import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addmin-payment',
  templateUrl: './addmin-payment.component.html',
  styleUrls: ['./addmin-payment.component.scss']
})
export class AddminPaymentComponent implements OnInit{
  SendList: Sent[] = [];
  urlbackend = APP_CONFIG.URL_BACKEND;
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/addmin1').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("sendAddmin1==>",this.SendList);
    });
  }

onSummitPayment(id_send: String) {
  
  Swal.fire({
    title: 'ยืนยันคำสั่งซื้อ?',
    text: "คุณตรวจสอบหลักฐานและต้องการยืนยันคำสั่งซื้อนี้ใช่หรือไม่?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28a745', 
    cancelButtonColor: '#757575',
    confirmButtonText: 'ใช่, ยืนยันคำสั่งซื้อ',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    
    if (result.isConfirmed) {
      
  
      Swal.fire({
        title: 'กำลังบันทึกข้อมูล...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      let data = {
        status_send: "3", 
      };

      this.http.put(this.urlbackend + '/api/v1/send/data/' + id_send, data).subscribe({
        next: (response) => {
        
          Swal.fire({
            icon: 'success',
            title: 'ยืนยันสำเร็จ!',
            text: 'ระบบได้ปรับสถานะคำสั่งซื้อเรียบร้อยแล้ว',
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
            text: 'ไม่สามารถอัปเดตสถานะได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',
            confirmButtonColor: '#f44336'
          });
          console.error(err);
        }
      });
    }
  });
}

  cancel(id_send: String) {
    
    Swal.fire({
      title: 'ยืนยันการยกเลิกคำสั่งซื้อ?',
      text: "คุณต้องการยกเลิกรายการสั่งซื้อนี้ใช่หรือไม่? (การกระทำนี้ไม่สามารถย้อนกลับได้)",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', 
      cancelButtonColor: '#757575',
      confirmButtonText: 'ใช่, ยกเลิกรายการ!',
      cancelButtonText: 'ปิดหน้าต่าง'
    }).then((result) => {
      
      if (result.isConfirmed) {
        
        
        Swal.fire({
          title: 'กำลังยกเลิกรายการ...',
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); }
        });
  
        let dataC = {
          status_send: "0", 
        };
  
        this.http.put(this.urlbackend + '/api/v1/send/data/' + id_send, dataC).subscribe({
          next: (response) => {
          
            Swal.fire({
              icon: 'success',
              title: 'ยกเลิกสำเร็จ!',
              text: 'รายการสั่งซื้อของคุณถูกยกเลิกเรียบร้อยแล้ว',
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
              text: 'ไม่สามารถยกเลิกรายการได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง',
              confirmButtonColor: '#f44336'
            });
          }
        });
      }
    });
  }

}

