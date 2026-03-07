import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../shared/constants/constants';


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
    type_product: new FormControl('',Validators.required),
    image_product: new FormControl('',Validators.required),
  });
  

  constructor(private http: HttpClient){}

  onsubmit(){
    debugger;
    const obj = this.addProduct.value;
    this.http.post(this.urlbackend +'/api/v1/product/data',obj).subscribe((res:any)=>{
      window.location.reload()
    })
  }

}


