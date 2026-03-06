import { Component, OnInit } from '@angular/core';
import { Card, ProductModel } from './card-model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent implements OnInit {

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
    // this.http.put('http://localhost:8080/api/v1/card/data/'+id_user,data).subscribe(response=>{
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

  deleteCard(id_card:string) {
    if (confirm('ยืนยันการลบ')) {
      this.http.delete("http://localhost:8080/api/v1/card/data/"+id_card )
        .subscribe(response => {
          console.log(response);
          window.location.reload()
        })
    }
  }

  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Card[]>('http://localhost:8080/api/v1/card/data-list/'+id_user).pipe()
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
