import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // เพิ่ม MatDialogRef เพื่อสั่งปิดหน้าต่าง
import { Address } from '../address/address-model';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  EditAressForm = new FormGroup({
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private dialogRef: MatDialogRef<EditAddressComponent> 
  ) { }

  ngOnInit(): void {
    this.http.get<Address>(this.urlbackend + '/api/v1/address/data/' + this.data.id)
      .subscribe((response: Address) => {
        
        this.EditAressForm.patchValue(response);
        console.log(response);
      });
  }

  onSubmit() {
    
    if (this.EditAressForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
        confirmButtonColor: '#ff9800'
      });
      return;
    }

    
    Swal.fire({
      title: 'ยืนยันการแก้ไขที่อยู่?',
      text: "คุณต้องการบันทึกการเปลี่ยนแปลงข้อมูลใช่หรือไม่",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#757575'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({
          title: 'กำลังบันทึกข้อมูล...',
          didOpen: () => { Swal.showLoading(); }
        });

        this.http.put(this.urlbackend + '/api/v1/address/data/' + this.data.id, this.EditAressForm.value)
          .subscribe({
            next: (response) => {
          
              Swal.fire({
                icon: 'success',
                title: 'แก้ไขสำเร็จ!',
                text: 'ที่อยู่ของคุณถูกอัปเดตเรียบร้อยแล้ว',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                this.dialogRef.close(true); 
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
    });
  }
}