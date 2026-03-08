import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-success',
  templateUrl: './send-success.component.html',
  styleUrls: ['./send-success.component.scss']
})
export class SendSuccessComponent implements OnInit{
urlbackend = APP_CONFIG.URL_BACKEND;
  SendList: Sent[] = [];
  profileUser: boolean = false;

  constructor(private http: HttpClient){}

  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }

  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/send4/'+id_user).pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("send==>",this.SendList);
    });
  }

receive(id_send: String) {
 
  Swal.fire({
    title: 'ยืนยันการได้รับสินค้า?',
    text: "คุณได้รับสินค้าถูกต้องและครบถ้วนแล้วใช่หรือไม่?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28a745', // สีเขียวสื่อถึงความสำเร็จ/ได้รับแล้ว
    cancelButtonColor: '#757575',
    confirmButtonText: 'ใช่, ฉันได้รับสินค้าแล้ว',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
 
    if (result.isConfirmed) {
      

      Swal.fire({
        title: 'กำลังบันทึกข้อมูล...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      let data = {
        status_send: "5", 
      };

      this.http.put(this.urlbackend + '/api/v1/send/data/' + id_send, data).subscribe({
        next: (response) => {

          Swal.fire({
            icon: 'success',
            title: 'ดำเนินการสำเร็จ!',
            text: 'ขอบคุณที่ใช้บริการของเรา',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
        
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่สามารถบันทึกข้อมูลได้ในขณะนี้',
            confirmButtonColor: '#f44336'
          });
        }
      });
    }
  });
}
}
