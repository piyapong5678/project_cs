import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  profileUser: boolean = false;
  addAdressForm = new FormGroup({
    id_address: new FormControl(''),
    housenumber_address: new FormControl('', Validators.required),
    village_address: new FormControl(''),
    housename_address: new FormControl('', Validators.required),
    road_address: new FormControl(''),
    subdistrict_address: new FormControl(''),
    district_address: new FormControl('', Validators.required),
    prefecture_address: new FormControl('', Validators.required),
    province_address: new FormControl('', Validators.required),
    postcode_address: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{5}")]),
    firstname_address: new FormControl('', Validators.required),
    lastname_address: new FormControl('', Validators.required),
    phone_address: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")])
  });

  constructor(private http: HttpClient) { }

  chekprofile() {
    this.profileUser = sessionStorage.hasOwnProperty('user');
  }

  ngOnInit(): void { }

  onSubmit() {
    this.chekprofile();

    
    if (!this.profileUser) {
      Swal.fire({
        icon: 'error',
        title: 'ไม่สามารถบันทึกได้',
        text: 'กรุณาเข้าสู่ระบบก่อนเพิ่มที่อยู่',
        confirmButtonColor: '#3f51b5'
      });
      return;
    }

    
    if (this.addAdressForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
        confirmButtonColor: '#ff9800'
      });
      return;
    }

    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    let data = {
      ...this.addAdressForm.value, 
      id_user: id_user,
    }


    Swal.fire({
      title: 'กำลังบันทึกที่อยู่...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.http.post(this.urlbackend + '/api/v1/address/data', data).subscribe({
      next: (res: any) => {

        Swal.fire({
          icon: 'success',
          title: 'เพิ่มที่อยู่สำเร็จ!',
          text: 'ข้อมูลที่อยู่ของคุณถูกบันทึกเรียบร้อยแล้ว',
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
          text: 'ไม่สามารถบันทึกข้อมูลได้ในขณะนี้',
          confirmButtonColor: '#f44336'
        });
      }
    });
  }
}