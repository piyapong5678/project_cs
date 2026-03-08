import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { Product } from './edit-product-model';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  EditProduct = new FormGroup({
    id_product: new FormControl(''),
    name_product: new FormControl('', Validators.required),
    detail_product: new FormControl('', Validators.required),
    number_product: new FormControl('', Validators.required),
    price_product: new FormControl('', Validators.required),
    type_product: new FormControl('', Validators.required),
    image_product: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private dialogRef: MatDialogRef<EditProductComponent> 
  ) { }

  ngOnInit(): void {
    
    this.http.get<Product>(this.urlbackend + '/api/v1/product/data/' + this.data.id)
      .subscribe({
        next: (response: Product) => {
          this.EditProduct.patchValue({ 
            name_product: response.name_product,
            detail_product: response.detail_product,
            number_product: response.number_product,
            price_product: response.price_product,
            type_product: response.type_product
            
          });
        },
        error: (err) => {
          Swal.fire('ผิดพลาด', 'ไม่สามารถดึงข้อมูลสินค้าได้', 'error');
        }
      });
  }

  onsubmit() {
    if (this.EditProduct.invalid) {
      Swal.fire('คำเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
      return;
    }

    
    Swal.fire({
      title: 'ยืนยันการแก้ไข?',
      text: "คุณต้องการบันทึกการเปลี่ยนแปลงข้อมูลใช่หรือไม่",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({
          title: 'กำลังบันทึก...',
          didOpen: () => { Swal.showLoading(); }
        });

        this.http.put(this.urlbackend + '/api/v1/product/data/' + this.data.id, this.EditProduct.value)
          .subscribe({
            next: (response) => {
              
              Swal.fire({
                icon: 'success',
                title: 'แก้ไขข้อมูลสำเร็จ!',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                this.dialogRef.close(true); 
                window.location.reload(); 
              });
            },
            error: (err) => {
              Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้', 'error');
            }
          });
      }
    });
  }
}