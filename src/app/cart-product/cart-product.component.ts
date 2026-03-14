import { Component, OnInit, NgZone } from '@angular/core'; // ✅ เพิ่ม NgZone
import { Card, ProductModel } from './card-model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  
  constructor(
    private http: HttpClient, 
    private router: Router,
    private _dialog: MatDialog,
    private zone: NgZone // ✅ Inject NgZone เพื่ออัปเดต UI
  ) {}
  
  counter: number = 0;
  counter2: number[] = [];
  CardList: Card[] = [];
  total: number = 0;
  profileUser: boolean = false;

  CardAdd = new FormGroup({
    id_card: new FormControl(''),
    number_card: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  })

  //  ปรับฟังก์ชันลดจำนวน: ลดแล้วส่งค่าไป API ทันที
  decrease(index: any) {
    if (this.counter2[index] - 1 > 0) {
      this.counter2[index] = this.counter2[index] - 1;
      this.updateQuantity(index); // ส่งค่าไป Backend
    }
  }

  //  ปรับฟังก์ชันเพิ่มจำนวน: เพิ่มแล้วส่งค่าไป API ทันที
  increase(index: any) {
    this.counter2[index] = this.counter2[index] + 1;
    this.updateQuantity(index); // ส่งค่าไป Backend
  }

  //  ฟังก์ชันสำหรับอัปเดตจำนวนในฐานข้อมูลทันที
  updateQuantity(index: number) {
    const id_card = this.CardList[index].id_card;
    const data = { number_card: this.counter2[index] };

    this.http.put(this.urlbackend + '/api/v1/card/data/' + id_card, data)
      .subscribe({
        next: () => {
          this.zone.run(() => {
            this.totalCard(); // คำนวณราคามวมใหม่บนหน้าจอ
            // แจ้งเตือน Navbar ให้เปลี่ยนเลขตามแบบเรียลไทม์
            window.dispatchEvent(new Event('cartUpdated')); 
          });
        },
        error: (err) => {
          console.error("Update Quantity Failed", err);
        }
      });
  }

  CardAll() {
    this.router.navigate(['shopping-card']);
    this._dialog.closeAll();
  }

  chekprofile() {
    this.profileUser = sessionStorage.hasOwnProperty('user');
  }

deleteCard(id_card: string) {
  // 1. ส่งคำสั่ง Delete ไปยัง Backend ทันที
  this.http.delete(this.urlbackend + "/api/v1/card/data/" + id_card)
    .subscribe({
      next: () => {
        this.zone.run(() => {
          // 2. ค้นหาตำแหน่งของสินค้าใน List
          const index = this.CardList.findIndex(item => item.id_card === id_card);
          
          if (index !== -1) {
            // 3. ลบข้อมูลออกจาก Array ทันทีเพื่อให้หน้าจออัปเดต
            this.CardList.splice(index, 1);
            this.counter2.splice(index, 1);
            
            // 4. คำนวณราคายอดรวมใหม่
            this.totalCard();
            
            // 5. แจ้ง Navbar ให้ดึงจำนวนสินค้าใหม่ (เลขตะกร้า)
            window.dispatchEvent(new Event('cartUpdated')); 
            
            // 6. ถ้าลบจนหมดตะกร้า ให้เซตยอดรวมเป็น 0
            if (this.CardList.length === 0) {
              this.total = 0;
            }
          }
          // หมายเหตุ: ลบ Swal.fire success ออกด้วยเพื่อให้ไม่มีแจ้งเตือนใดๆ เด้งขึ้นมา
        });
      },
      error: (err) => {
        console.error('ลบสินค้าไม่สำเร็จ:', err);
        // เลือกได้ว่าถ้าลบไม่สำเร็จ (เช่น Error 500) จะให้โชว์แจ้งเตือนหรือไม่
      }
    });
}

  ngOnInit(): void {
    this.chekprofile();
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.http.get<Card[]>(this.urlbackend + '/api/v1/card/data-list/' + user.id_user)
        .subscribe((response: Card[]) => {
          this.CardList = response;
          this.total = 0;
          this.CardList.forEach((obj, index) => {
            this.counter2[index] = Number(obj.number_card);
            this.total += (this.counter2[index] * Number(obj.productModel.price_product));
          });
        });
    }
  }
  
  totalCard() {
    this.total = 0;
    this.CardList.forEach((obj, index) => {
      this.total += (this.counter2[index] * Number(obj.productModel.price_product));
    });
  }
}