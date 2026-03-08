import { Component, OnInit } from '@angular/core';
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
  constructor(private http: HttpClient, 
    private router: Router,
    private _dialog: MatDialog){}
  
  counter:number = 0;

  counter2 :number[] = [];
  CardList: Card[] = [];
  total: number = 0;
  profileUser: boolean = false;

  CardAdd = new FormGroup({
    id_card:  new FormControl(''),
    number_card: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  })

  decrease(index:any){
    // if(this.counter-1>0){
    //   this.counter--;
    // }
    console.log();
    if(this.counter2[index]-1>0){
      this.counter2[index] = this.counter2[index] - 1;
      this.totalCard();
    }
    
  }

  CardAll(){
    // this.chekprofile();
    // let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    // let data = {
    //   number_card: this.counter2,
    // }
    // this.http.put(this.urlbackend +'/api/v1/card/data/'+id_user,data).subscribe(response=>{
    //   console.log(response);
    // })
    this.router.navigate(['shopping-card']);
    this._dialog.closeAll();

  }

  increase(index:any){
    // if(this.counter +1 < 100){
    //   this.counter++;
    // }

    // if(counter +1 < 100){
      this.counter2[index] = this.counter2[index] + 1;
      console.log(this.counter2);
      this.totalCard();
    // }
  }
  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }

deleteCard(id_card: string) {
  
  Swal.fire({
    title: 'ยืนยันการลบ?',
    text: "คุณต้องการนำสินค้าชิ้นนี้ออกจากตะกร้าใช่หรือไม่?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', 
    cancelButtonColor: '#757575',
    confirmButtonText: 'ใช่, ลบเลย!',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    
    if (result.isConfirmed) {
      
      
      Swal.fire({
        title: 'กำลังลบ...',
        didOpen: () => { Swal.showLoading(); }
      });

      this.http.delete(this.urlbackend + "/api/v1/card/data/" + id_card)
        .subscribe({
          next: (response) => {
        
            Swal.fire({
              icon: 'success',
              title: 'ลบสำเร็จ!',
              text: 'สินค้าถูกนำออกจากตะกร้าแล้ว',
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
              text: 'ไม่สามารถลบสินค้าได้ในขณะนี้',
              confirmButtonColor: '#f44336'
            });
          }
        });
    }
  });
}

  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Card[]>(this.urlbackend +'/api/v1/card/data-list/'+id_user).pipe()
    .subscribe((response: Card[]) => {
      this.CardList=response;
      this.CardList.forEach((obj,index) => {
      this.counter2[index] = Number(obj.number_card);
      this.total = this.total + Number(Number(this.counter2[index])*Number(obj.productModel.price_product))
    });
      // this.CardAdd.controls['number_card'].setValue(response.number_card);
    console.log(response);
});

  }
  
  totalCard(){
    this.total = 0;
    this.CardList.forEach((obj,index) => {
      this.total = this.total + Number(Number(this.counter2[index])*Number(obj.productModel.price_product))
    });
  }

}
