import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PressToOrderComponent } from '../press-to-order/press-to-order.component';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { Router } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-list-model';
import { Card } from '../cart-product/card-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private _dialog: MatDialog, private router: Router, private http: HttpClient) { }
  ProductList: Product[] = [];
  CardList: Card[] = [];
  Product_id!: any;
  originalProductList: Product[] = [];
  // profileUser: boolean = false;
  openCardProduct() {
    this._dialog.open(CartProductComponent);

  }
  openAddProduct() {
    this._dialog.open(AddProductComponent, {
      width: '600px',
    });
  }

  // chekprofile(){
  //   sessionStorage.hasOwnProperty('user');
  //   this.profileUser = sessionStorage.hasOwnProperty('user');
  //   console.log(sessionStorage.hasOwnProperty('user'));
  // }
  // PressProduct(id_product: String) {

  //   this.router.navigate(['press-to-order',"/"+id_product]);

  // }

  all(){
    this.http.get<Product[]>("http://localhost:8080/api/v1/product")
    .subscribe(response => {
      console.log(response);
      this.ProductList = response;
      this.originalProductList = response;
    })   
  }
  
  equiment(){
    this.http.get<Product[]>("http://localhost:8080/api/v1/product/productType")
    .subscribe(response => {
      console.log(response);
      this.ProductList = response;
      this.originalProductList = response;
    })
  }

  food(){
    this.http.get<Product[]>("http://localhost:8080/api/v1/product/productType2")
    .subscribe(response => {
      console.log(response);
      this.ProductList = response;
      this.originalProductList = response;
    })
    
  }

  ngOnInit(): void {
    // this.chekprofile();
    // let id_user= JSON.parse(sessionStorage.getItem('user')!).id_user;
    // this.http.get<Card[]>('http://localhost:8080/api/v1/card/usercard/'+id_user)
    // .subscribe(response => {
    //   console.log(response);
    //   this.CardList = response;
    // })

    this.http.get<Product[]>("http://localhost:8080/api/v1/product")
      .subscribe(response => {
        console.log(response);
        this.ProductList = response;
        this.originalProductList = response;
      })    
  }

  onKeyAll(event: any) {
    this.ProductList = this.originalProductList.filter((data) =>
      data.name_product.toLowerCase().includes(event.target.value.toLowerCase())
    );
}
}
