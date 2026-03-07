import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product-list-model';
import { Router } from '@angular/router';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit{

  constructor(private _dialog: MatDialog, private http: HttpClient, private router: Router){}
  urlbackend = APP_CONFIG.URL_BACKEND;
  ProductList : Product[] = [];

  openAddProduct(){
    this._dialog.open(AddProductComponent,{
      width: '600px',
    });
  }
  EditProduct(id_product: String ){
    const dialogRef = this._dialog.open(EditProductComponent, {
      data: { id: id_product },
      width: '600px',
    })
    console.log(id_product);
    // this.router.navigate(['edit-product']);
  }

  deleteProduct(id_product: String){
    if(confirm('ยืนยันการลบ'))
      {
        this.http.delete(this.urlbackend +"/api/v1/product/data/"+id_product)
        .subscribe(response=>{
              console.log(response);
              window.location.reload()
            })
      }
  }

  ngOnInit(): void {
    this.http.get<Product[]>(this.urlbackend +"/api/v1/product")
    .subscribe(response=>{
      console.log(response);
      this.ProductList = response;
    })
    
  //   let id_product = "7732a323-5ae9-478a-8ce9-d44622ec1f1a";
  //   this.http.get<Product>(this.urlbackend +"/api/v1/product/data/"+id_product)
  //   .subscribe(response=>{
  //     console.log(response);
  //   })
  //   let id_product2 = "7732a323-5ae9-478a-8ce9-d44622ec1f1a";
  //   let data =   {
  //     name_product: "ตู้ปลาขนากกลาง",
  //     price_product: "500",
  //     detail_product: "ชุดตู้ปลา ตู้กั้นกรอง 24 นิ้ว พร้อมอุปกรณ์กรอง มีโคมไฟ SOBO AL600P · ตู้เก็บปลา ",
  //     image_product: "https://down-th.img.susercontent.com/file/th-11134207-7r98o-lokmuqizbpus1e",
  //     type_product: "อุปกรณ์เสริมและของตกแต่ง",
  //     number_product: "5"
  // }
  //   this.http.put(this.urlbackend +"/api/v1/product/data/"+id_product2,data)
  //   .subscribe(response=>{
  //     console.log(response);
  //   })
  
  }
}


