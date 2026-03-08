import { Component, OnInit } from '@angular/core';
import { CardProductModel, ProductModel, Sent } from './sent-payment-model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  urlbackend = APP_CONFIG.URL_BACKEND;
  SendList: Sent[] = [];
  profileUser: boolean = false;
  total: number = 0;
  file: File | undefined;
  fileCheck: boolean = true;
  constructor(private http: HttpClient){}

  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }

  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/send1/'+id_user).pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("send==>",this.SendList);
    });

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if(this.file){
      this.fileCheck = false;
    }
  }

  onPayment(id_send: String) {
  
  Swal.fire({
    title: 'ยืนยันการแจ้งชำระเงิน?',
    text: "กรุณาตรวจสอบหลักฐานการโอนให้ถูกต้อง",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#757575',
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      
      
      Swal.fire({
        title: 'กำลังบันทึกข้อมูล...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      
      const formData = new FormData();
      formData.append('id_send', id_send.toString());
      formData.append('file', this.file!);

      let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "multipart/form-data"
        })
      };

      let data = {
        status_send: "2",
      };

      
      this.http.post(this.urlbackend + '/api/v1/payment/data/file', formData).subscribe(response => {
        console.log("response,", response);
      });

  
      this.http.put(this.urlbackend + '/api/v1/send/data/' + id_send, data).subscribe(response => {
        console.log(response);
        
    
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: 'แจ้งชำระเงินเรียบร้อยแล้ว',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.reload(); //
        });
      });
      // ---------------------------------------
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
