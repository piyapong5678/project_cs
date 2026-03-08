import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  urlbackend = APP_CONFIG.URL_BACKEND;
  addProduct = new FormGroup({
    id_product: new FormControl(''),
    name_product: new FormControl('', Validators.required),
    detail_product: new FormControl('', Validators.required),
    number_product: new FormControl('', Validators.required),
    price_product: new FormControl('', Validators.required),
    type_product: new FormControl('', Validators.required),
    image_product: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient) { }

  onsubmit() {
    
    if (this.addProduct.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ครบถ้วน!',
        text: 'กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบทุกช่อง',
        confirmButtonColor: '#f44336'
      });
      return;
    }

    const obj = this.addProduct.value;
    
    
    Swal.fire({
      title: 'กำลังบันทึกข้อมูล...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.http.post(this.urlbackend + '/api/v1/product/data', obj).subscribe({
      next: (res: any) => {
        
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มสินค้าสำเร็จ!',
          text: 'สินค้าของคุณถูกบันทึกเข้าสู่ระบบแล้ว',
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
          text: 'ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#f44336'
        });
      }
    });
  }
}