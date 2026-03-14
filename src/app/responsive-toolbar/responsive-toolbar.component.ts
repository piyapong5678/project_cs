import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.scss'],
})
export class ResponsiveToolbarComponent implements OnInit, OnDestroy {
  urlbackend = APP_CONFIG.URL_BACKEND;
  checkLoinUser: boolean = false;
  roleCode: string = "";
  cartCount: number = 0;

  constructor(
    private _dialog: MatDialog, 
    private router: Router,
    private http: HttpClient,
    private zone: NgZone 
  ) {}

  ngOnInit(): void {
    this.checkLoin();
    this.getCartCount();
    
    // ✅ ลงทะเบียน Event Listener แบบระบุตัวแปรเพื่อล้างออกได้ถูกต้อง
    window.addEventListener('cartUpdated', this.handleCartUpdate);
  }

  ngOnDestroy(): void {
    // ✅ ล้าง Event เมื่อปิดหน้าเพื่อป้องกัน Memory Leak
    window.removeEventListener('cartUpdated', this.handleCartUpdate);
  }

  // ✅ ใช้ Arrow Function เพื่อรักษา Context ของ 'this'
  private handleCartUpdate = () => {
    this.zone.run(() => { 
      console.log("Navbar: ได้รับสัญญาณอัปเดตตะกร้า");
      this.getCartCount(); 
    });
  };

 getCartCount() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.http.get<any[]>(this.urlbackend + '/api/v1/card/data-list/' + user.id_user)
          .subscribe({
            next: (res) => {
              this.zone.run(() => { 
                // ตรวจสอบว่ามีข้อมูลกลับมาจริงๆ และเป็น Array
                this.cartCount = (res && Array.isArray(res)) ? res.length : 0; 
                console.log("Navbar อัปเดตจำนวนเป็น:", this.cartCount);
              });
            },
            error: (err) => {
              this.zone.run(() => { this.cartCount = 0; });
            }
          });
      } catch (e) {
        this.cartCount = 0;
      }
    } else {
      this.cartCount = 0; // ถ้าไม่มี user ใน session ต้องเป็น 0 เสมอ
    }
  }

  checkLoin() {
    this.checkLoinUser = sessionStorage.hasOwnProperty('user');
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.roleCode = user.role_code;
    }
  }

  openAddLoginEmForm() {
    this._dialog.open(LoginComponent, { width: '600px' });
  }

  // ✅ ปรับปรุง Logout ให้ใช้ SweetAlert2 ตามที่คุณต้องการ
  logout() {
    Swal.fire({
      title: 'ยืนยันการออกจากระบบ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.checkLoinUser = false;
        this.cartCount = 0;
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}