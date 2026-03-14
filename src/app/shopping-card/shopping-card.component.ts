import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';
import { Router } from '@angular/router';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { Address } from '../address/address-model';
import { HttpClient } from '@angular/common/http';
import { Card } from '../cart-product/card-model';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit, OnDestroy {
  urlbackend = APP_CONFIG.URL_BACKEND;
  counter: number = 0;
  ProductList!: Card;
  counter2: number[] = [];
  CardList: Card[] = [];
  chekclik: any[] = [];
  dataIdAddress: String = "";
  total: number = 0;
  profileUser: boolean = false;
  AddressList: Address[] = [];

  constructor(
    private _dialog: MatDialog, 
    private router: Router, 
    private http: HttpClient,
    private zone: NgZone 
  ) { }

  ngOnInit(): void {
    this.loadData();
    // ✅ ลงทะเบียน Event Listener เพื่อรับรู้การอัปเดตจากภายนอก
    window.addEventListener('cartUpdated', this.handleCartUpdate);
  }

  ngOnDestroy(): void {
    // ✅ ล้าง Event เมื่อปิดคอมโพเนนต์เพื่อประสิทธิภาพของระบบ
    window.removeEventListener('cartUpdated', this.handleCartUpdate);
  }

  // ✅ จัดการสัญญาณอัปเดตแบบเรียลไทม์
  private handleCartUpdate = () => {
    this.zone.run(() => {
      // โหลดข้อมูลใหม่เฉพาะกรณีที่มีการเปลี่ยนแปลงจากหน้าอื่น (เช่น เพิ่มสินค้าใหม่)
      this.loadData(); 
    });
  };

  loadData() {
    this.chekprofile();
    const userData = sessionStorage.getItem('user');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        const id_user = user.id_user;

        // ดึงข้อมูลที่อยู่จัดส่ง
        this.http.get<Address[]>(this.urlbackend + "/api/v1/address/userAddress/" + id_user)
          .subscribe(response => {
            this.zone.run(() => {
              this.AddressList = response;
              this.AddressList.forEach((_, index) => {
                this.chekclik[index] = false;
              });
            });
          });

        // ดึงข้อมูลรายการสินค้าในตะกร้า
        this.http.get<Card[]>(this.urlbackend + '/api/v1/card/data-list/' + id_user)
          .subscribe((response: Card[]) => {
            this.zone.run(() => {
              this.CardList = response;
              this.total = 0; 
              this.CardList.forEach((obj, index) => {
                this.counter2[index] = Number(obj.number_card);
                this.total += (this.counter2[index] * Number(obj.productModel.price_product));
              });
            });
          });
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }

confirmOrder() {
    // ✅ 1. ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่
    if (this.CardList.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'ตะกร้าว่างเปล่า',
        text: 'กรุณาเลือกสินค้าใส่ตะกร้าก่อนทำการสั่งซื้อ',
        confirmButtonColor: '#f44336',
        confirmButtonText: 'ไปเลือกสินค้า'
      }).then(() => {
        this.router.navigate(['home']); // ส่งผู้ใช้กลับหน้าหลักเพื่อเลือกของ
      });
      return;
    }

    // ✅ 2. ตรวจสอบว่าเลือกที่อยู่หรือยัง
    if (!this.dataIdAddress || this.dataIdAddress === "") {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเลือกที่อยู่',
        text: 'โปรดเลือกที่อยู่จัดส่งสินค้าก่อนยืนยันการสั่งซื้อ',
        confirmButtonColor: '#3f51b5',
        confirmButtonText: 'ตกลง'
      });
      return; 
    }

    // หากผ่านทั้งสองเงื่อนไข ให้ทำการสั่งซื้อ
    this.submitOrder();
  }

  submitOrder() {
    this.router.navigate(['/submit-card', this.dataIdAddress]);
  }

  decrease(index: any) {
    if (this.counter2[index] - 1 > 0) {
      this.counter2[index] = this.counter2[index] - 1;
      this.updateQuantity(index);
    }
  }

  increase(index: any) {
    this.counter2[index] = this.counter2[index] + 1;
    this.updateQuantity(index);
  }

  // ✅ อัปเดตจำนวนสินค้าโดยไม่โหลดใหม่ทั้งหมด ป้องกันรายการสินค้าสลับที่
  updateQuantity(index: number) {
    const id_card = this.CardList[index].id_card;
    const data = { number_card: this.counter2[index] };
    
    this.http.put(this.urlbackend + '/api/v1/card/data/' + id_card, data)
      .subscribe(() => {
        this.zone.run(() => {
          this.totalCard(); // คำนวณราคารวมใหม่บนหน้าจอทันที
          window.dispatchEvent(new Event('cartUpdated')); // แจ้ง Navbar ให้เปลี่ยนยอดตาม
        });
      });
  }

  deleteProfile(id_address: String) {
    Swal.fire({
      title: 'ยืนยันการลบที่อยู่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.urlbackend + "/api/v1/address/data/" + id_address)
          .subscribe(() => {
            this.loadData();
          });
      }
    });
  }

  // ✅ ลบสินค้าทันทีโดยไม่มี Pop-up และใช้การ splice เพื่อความลื่นไหล
  deleteCard(id_card: string) {
    this.http.delete(this.urlbackend + "/api/v1/card/data/" + id_card)
      .subscribe(() => {
        this.zone.run(() => {
          // ลบรายการออกจาก Array ทันทีโดยไม่ต้องรอโหลดข้อมูลใหม่จาก Server ทั้งหมด
          const index = this.CardList.findIndex(item => item.id_card === id_card);
          if (index !== -1) {
            this.CardList.splice(index, 1);
            this.counter2.splice(index, 1);
            this.totalCard(); // คำนวณราคายอดรวมใหม่
          }
          window.dispatchEvent(new Event('cartUpdated'));
        });
      });
  }

  // ✅ คำนวณราคายอดชำระเงินรวม
  totalCard() {
    this.total = 0;
    this.CardList.forEach((obj, index) => {
      this.total += (this.counter2[index] * Number(obj.productModel.price_product));
    });
  }

  chekprofile() {
    this.profileUser = sessionStorage.hasOwnProperty('user');
  }

  // ✅ จัดการการเลือกที่อยู่และแสดง/ซ่อนที่อยู่ที่ไม่ถูกเลือก
  choosAddress(id_address: string, index: number) {
    const isAlreadySelected = this.dataIdAddress === id_address;
    if (isAlreadySelected) {
      this.dataIdAddress = ""; 
      this.AddressList.forEach((obj) => {
        const el = document.getElementById(obj.id_address);
        if (el) el.style.display = "block";
      });
    } else {
      this.dataIdAddress = id_address;
      this.AddressList.forEach((obj) => {
        const el = document.getElementById(obj.id_address);
        if (el) {
          el.style.display = (obj.id_address === id_address) ? "block" : "none";
        }
      });
    }
    this.chekclik.forEach((_, i) => this.chekclik[i] = (i === index && this.dataIdAddress !== ""));
  }

  EditAddress(id_address: String) {
    this._dialog.open(EditAddressComponent, { data: { id: id_address } });
  }

  openAddAddress() {
    this._dialog.open(AddAddressComponent);
  }
}