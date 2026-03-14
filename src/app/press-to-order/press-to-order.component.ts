import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product-list-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2'; // ✅ อย่าลืม import Swal เพื่อความสวยงาม

@Component({
  selector: 'app-press-to-order',
  templateUrl: './press-to-order.component.html',
  styleUrls: ['./press-to-order.component.scss']
})
export class PressToOrderComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  counter: number = 0;
  Product_id!: any;
  ProductList!: Product;
  profileUser: boolean = false;

  Card = new FormGroup({
    id_card: new FormControl(''),
    statuscard: new FormControl('0'),
  })

  constructor(private router: ActivatedRoute, private router1: Router, private http: HttpClient) { }

  chekprofile() {
    this.profileUser = sessionStorage.hasOwnProperty('user');
  }

  ngOnInit(): void {
    this.Product_id = this.router.snapshot.paramMap.get('id');
    this.http.get<Product>(this.urlbackend + '/api/v1/product/data/' + this.Product_id)
      .subscribe((response: Product) => {
        this.ProductList = response;
      });
  }

  submit() {
    this.chekprofile();
    const userData = sessionStorage.getItem('user');

    // 1. 🛡️ เช็คก่อนว่า Login หรือยังเพื่อป้องกัน Error id_user เป็น null
    if (userData) {
      const user = JSON.parse(userData);
      const id_user = user.id_user;

      // 2. ตรวจสอบว่าเลือกจำนวนสินค้าหรือยัง
      if (this.counter <= 0) {
        Swal.fire({ icon: 'warning', title: 'กรุณาระบุจำนวนสินค้า' });
        return;
      }

      let data = {
        id_product: this.Product_id,
        id_user: id_user,
        number_card: this.counter,
        statuscard: this.Card.value.statuscard,
      }

      this.http.post(this.urlbackend + '/api/v1/card/data', data).subscribe((res: any) => {
        // ✅ 3. หัวใจสำคัญ: ส่งสัญญาณบอกทุกส่วนของแอปว่า "ตะกร้าอัปเดตแล้ว!"
        // คำสั่งนี้จะทำให้ Navbar และหน้า Shopping Card อัปเดตตัวเลขทันที
        window.dispatchEvent(new Event('cartUpdated'));

        Swal.fire({
          icon: 'success',
          title: 'เพิ่มลงตะกร้าสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router1.navigate(['home']);
        });
      });
    } else {
      // กรณีไม่ได้ Login
      Swal.fire({ icon: 'error', title: 'กรุณาเข้าสู่ระบบก่อนเลือกซื้อสินค้า' });
    }
  }

  decrease() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  increase() {
    if (this.counter < 100) {
      this.counter++;
    }
  }
}