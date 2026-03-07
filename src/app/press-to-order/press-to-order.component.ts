import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product-list-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../shared/constants/constants';


@Component({
  selector: 'app-press-to-order',
  templateUrl: './press-to-order.component.html',
  styleUrls: ['./press-to-order.component.scss']
})
export class PressToOrderComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  counter: number= 0;
  Product_id!: any;
  ProductList!: Product;
  profileUser: boolean = false;
  Card = new FormGroup({
    id_card: new FormControl(''),  
    // number_card: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    statuscard:  new FormControl('0'),
    // name_product_card: new FormControl(''),
    // detail_product_card: new FormControl(''),
    // price_product_caard: new FormControl(''),
    // remain_product_card: new FormControl(''),
    // image_product_card: new FormControl(''),
  })


  constructor( private router: ActivatedRoute,private router1: Router,private http: HttpClient){}
  chekprofile(){
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }
  ngOnInit(): void {
    
    this.Product_id = this.router.snapshot.paramMap.get('id');
    console.log("id==>",this.Product_id);
    this.http.get<Product>(this.urlbackend +'/api/v1/product/data/'+this.Product_id)
    .subscribe((response: Product) => {
      this.ProductList= response;
  });
  }

  submit(){
    this.chekprofile();
    let id_user= JSON.parse(sessionStorage.getItem('user')!).id_user;
    let data = {
      id_product: this.Product_id,
      id_user: id_user,
      number_card: this.counter,
      statuscard: this.Card.value.statuscard,
    }
    console.log("data==>",data)
    this.http.post(this.urlbackend +'/api/v1/card/data',data).subscribe((res:any)=>{
      console.log(res);
      this.router1.navigate(['home']);
    })
  }
  

  decrease(){
    if(this.counter-1>0){
      this.counter--;
    }
    
  }

  increase(){
    if(this.counter +1 < 100){
      this.counter++;
    }
  }


}
