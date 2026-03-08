import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';
import { Router } from '@angular/router';
import { Address } from './address-model';
import { HttpClient } from '@angular/common/http';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],

})

export class AddressComponent implements OnInit {
  
  constructor(private _dialog: MatDialog, private router: Router, private http: HttpClient) { }
  urlbackend = APP_CONFIG.URL_BACKEND;
  AddressList: Address[] = [];
  profileUser: boolean = false;
  openAddAddress() {
    this._dialog.open(AddAddressComponent);
  }

  EditAddress(id_address: String) {
    const dialogRef = this._dialog.open(EditAddressComponent,{
      data: {id: id_address},
    });
    console.log(id_address);
  }
  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }
deleteProfile(id_address: String) {
  // 1. แสดง Pop-up ถามยืนยันการลบ
  Swal.fire({
    title: 'ยืนยันการลบที่อยู่?',
    text: "คุณต้องการลบข้อมูลที่อยู่นี้ใช่หรือไม่? (การกระทำนี้ไม่สามารถย้อนกลับได้)",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', 
    cancelButtonColor: '#757575', 
    confirmButtonText: 'ใช่, ลบเลย!',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    
    if (result.isConfirmed) {   
      Swal.fire({
        title: 'กำลังลบข้อมูล...',
        didOpen: () => { Swal.showLoading(); }
      });

      this.http.delete(this.urlbackend + "/api/v1/address/data/" + id_address)
        .subscribe({
          next: (response) => {

            Swal.fire({
              icon: 'success',
              title: 'ลบสำเร็จ!',
              text: 'ที่อยู่ของคุณถูกลบออกจากระบบแล้ว',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              window.location.reload(); 
            });
          },
          error: (err) => {
            
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถลบที่อยู่ได้ในขณะนี้',
              confirmButtonColor: '#f44336'
            });
          }
        });
    }
  });
}


  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Address[]>(this.urlbackend +"/api/v1/address/userAddress/" + id_user)
      .subscribe(response => {
        console.log(response);
        this.AddressList = response;
      })
  }

}
