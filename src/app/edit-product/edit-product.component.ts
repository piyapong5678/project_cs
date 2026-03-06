import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from './edit-product-model';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{
  
  // EditProduct!: FormGroup;
  EditProduct = new FormGroup({
    id_product: new FormControl(''),
    name_product: new FormControl('', Validators.required),
    detail_product: new FormControl('', Validators.required),
    number_product: new FormControl('', Validators.required),
    price_product: new FormControl('', Validators.required),
    type_product: new FormControl('',Validators.required),
    image_product: new FormControl(''),
  });

  // genarateForm(data: Product){
  //     this.EditProduct = new FormGroup({
  //     // id_product: new FormControl(data.id_product),
  //     name_product: new FormControl(data.name_product, Validators.required),
  //     detail_product: new FormControl(data.detail_product, Validators.required),
  //     number_product: new FormControl(data.number_product, Validators.required),
  //     price_product: new FormControl(data.price_product, Validators.required),
  //     type_product: new FormControl(data.type_product,Validators.required),
  //     image_product: new FormControl(data.image_product),
  //   });
  // }

  

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private http: HttpClient) { }


  ngOnInit(): void {

    this.http.get<Product>('http://localhost:8080/api/v1/product/data/'+this.data.id).pipe()
    .subscribe((response: Product) => {
        this.EditProduct.controls['name_product'].setValue(response.name_product);
      this.EditProduct.controls['detail_product'].setValue(response.detail_product);
      this.EditProduct.controls['number_product'].setValue(response.number_product);
      this.EditProduct.controls['price_product'].setValue(response.price_product);
      this.EditProduct.controls['type_product'].setValue(response.type_product);
      // this.EditProduct.controls['image_product'].setValue(response.image_product);
      console.log(response);

  });
  }
  
  onsubmit(){
    // let data = {
    //   name_product: this.EditProduct.value.name_product,
    //   price_product: this.EditProduct.value.price_product,
    //   detail_product: this.EditProduct.value.detail_product,
    //   image_product: "",
    //   type_product: this.EditProduct.value.type_product,
    //   number_product: this.EditProduct.value.number_product
    // }
    console.log("data==>",this.EditProduct.value);
    this.http.put('http://localhost:8080/api/v1/product/data/'+this.data.id,this.EditProduct.value).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })
  }
 
}
