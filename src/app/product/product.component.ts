import { Component, OnInit, HostListener } from '@angular/core'; // 1. เพิ่ม HostListener
import { MatDialog } from '@angular/material/dialog';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { Router } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-list-model';
import { Card } from '../cart-product/card-model';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  cartCount: number = 0;

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
  ) {}

  ProductList: Product[] = [];
  CardList: Card[] = [];
  originalProductList: Product[] = [];


  @HostListener('window:cartUpdated')
  onCartUpdated() {
    console.log('รับสัญญาณอัปเดตตะกร้า: กำลังโหลดจำนวนใหม่...');
    this.getCartCount(); // เมื่อมีการลบสินค้า สั่งให้โหลดเลข Badge ใหม่ทันที
  }

  openCardProduct() {
    this._dialog.open(CartProductComponent);
  }

  openAddProduct() {
    this._dialog.open(AddProductComponent, {
      width: '600px',
    });
  }

  all() {
    this.http
      .get<Product[]>(this.urlbackend + '/api/v1/product')
      .subscribe((response) => {
        this.ProductList = response;
        this.originalProductList = response;
      });
  }

  equiment() {
    this.http
      .get<Product[]>(this.urlbackend + '/api/v1/product/productType')
      .subscribe((response) => {
        this.ProductList = response;
        this.originalProductList = response;
      });
  }

  food() {
    this.http
      .get<Product[]>(this.urlbackend + '/api/v1/product/productType2')
      .subscribe((response) => {
        this.ProductList = response;
        this.originalProductList = response;
      });
  }

  ngOnInit(): void {
    this.getCartCount();

    this.http
      .get<Product[]>(this.urlbackend + '/api/v1/product')
      .subscribe((response) => {
        this.ProductList = response;
        this.originalProductList = response;
      });
  }

  getCartCount() {
    const userData = sessionStorage.getItem('user');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        const id_user = user.id_user;

        // ดึงรายการสินค้าในตะกร้าล่าสุดจาก Database
        this.http
          .get<any[]>(this.urlbackend + '/api/v1/card/data-list/' + id_user)
          .subscribe((response) => {
            // อัปเดตตัวแปร cartCount ซึ่งจะทำให้ [matBadge] เปลี่ยนตามอัตโนมัติ
            this.cartCount = response.length;
          });
      } catch (e) {
        console.error('Error parsing user for cart count', e);
        this.cartCount = 0;
      }
    } else {
      this.cartCount = 0;
    }
  }

  onKeyAll(event: any) {
    this.ProductList = this.originalProductList.filter((data) =>
      data.name_product
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    );
  }
}