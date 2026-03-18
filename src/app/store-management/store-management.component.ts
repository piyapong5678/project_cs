import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // นำเข้า HttpClient
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../shared/constants/constants'; // นำเข้า URL_BACKEND
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss']
})
export class StoreManagementComponent implements OnInit {

  // กำหนด Path ภายใน Component โดยดึงมาจาก constants.ts
  private url = `${APP_CONFIG.URL_BACKEND}/api/v1/store`;

  storeData: any = {
    id_store: 'S001', 
    storename: '',
    ownername: '',
    email: '',
    address_no: '',
    moo: '',
    subdistrict: '',
    district: '',
    province: '',
    zipcode: '',
    phone: '',
    image_store: ''
  };

  // Inject HttpClient เข้ามาที่นี่โดยตรง
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  // 1. ฟังก์ชันดึงข้อมูลร้านค้า (เขียนสดใน Component)
  loadData() {
    this.http.get(`${this.url}/get`).subscribe({
      next: (res: any) => {
        if (res) this.storeData = res;
      },
      error: (err) => console.error('Error loading data', err)
    });
  }

  // 2. ฟังก์ชันแก้ไขข้อมูลร้านค้า (เขียนสดใน Component)
  saveData() {
    Swal.fire({
      title: 'ยืนยันการบันทึก?',
      text: "คุณต้องการแก้ไขข้อมูลร้านค้าใช่หรือไม่",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        // ใช้ this.http.put โดยตรง
        this.http.put(`${this.url}/update`, this.storeData).subscribe({
          next: (res: any) => {
            Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อย', 'success');
            this.loadData();
          },
          error: (err) => Swal.fire('ผิดพลาด!', 'บันทึกไม่ได้', 'error')
        });
      }
    });
  }
}