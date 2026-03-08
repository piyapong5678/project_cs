import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';
import { Router } from '@angular/router';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { Address } from '../address/address-model';
import { HttpClient } from '@angular/common/http';
import { Card } from '../cart-product/card-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../shared/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit{
  urlbackend = APP_CONFIG.URL_BACKEND;
  counter:number = 0;
  ProductList!: Card;
  counter2 :number[] = [];
  CardList: Card[] = [];
  chekclik: any[] = [];
  dataIdAddress: String = "";
  total: number = 0;
    constructor(private _dialog: MatDialog, private router: Router, private http: HttpClient){}
    profileUser: boolean = false;
    AddressList: Address[] = [];
    
    // CardAdd = new FormGroup({
    //   id_card:  new FormControl(''),
    //   id_addres:  new FormControl(''),
    //   number_card: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    // })
  
    ngOnInit(): void {
      this.chekprofile();
      let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
      this.http.get<Address[]>(this.urlbackend +"/api/v1/address/userAddress/" + id_user)
      .subscribe(response => {
        console.log(response);
        this.AddressList = response;
        this.AddressList.forEach((obj,index) => {
          this.chekclik[index] = false;
        });
      })

      this.http.get<Card[]>(this.urlbackend +'/api/v1/card/data-list/'+id_user).pipe()
      .subscribe((response: Card[]) => {
        this.CardList=response;
        this.CardList.forEach((obj,index) => {
        this.counter2[index] = Number(obj.number_card);
        this.total = this.total + Number(Number(this.counter2[index])*Number(obj.productModel.price_product))

      });

        console.log(response);
        });
    }
    
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

    choosAddress(id_address: string,index: number){
      console.log("daAddress==>",this.chekclik[index]);
      // if(!this.chekclik[index]){
        // 
        // this.chekclik.forEach((obj,index) => {
        //   this.chekclik[index] = false;
        // });
        // this.chekclik[index] = true;
        // console.log("daAddress==>",this.dataIdAddress);
      // }else{
      //   this.chekclik[index] = true;
      // }
      this.dataIdAddress = id_address;
      if(!this.chekclik[index]){
        this.AddressList.forEach((obj,index) => {
          if(obj.id_address != id_address){
            document.getElementById(obj.id_address)!.style.display = "none";
          }
        });
      }else{
        this.AddressList.forEach((obj,index) => {
          if(obj.id_address != id_address){
            document.getElementById(obj.id_address)!.style.display = "block";
          }
        });
      }
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

    EditAddress(id_address: String){
      const dialogRef = this._dialog.open(EditAddressComponent,{
        data: {id: id_address},
      });
    }
    openAddAddress(){
      this._dialog.open(AddAddressComponent);
    }
    chekprofile() {
      sessionStorage.hasOwnProperty('user');
      this.profileUser = sessionStorage.hasOwnProperty('user');
      console.log(sessionStorage.hasOwnProperty('user'));
    }
deleteProfile(id_address: String) {

  Swal.fire({
    title: 'ยืนยันการลบที่อยู่?',
    text: "คุณต้องการลบข้อมูลที่อยู่นี้ใช่หรือไม่? (การกระทำนี้ไม่สามารถย้อนกลับได้)",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', 
    cancelButtonColor: '#757575', 
    confirmButtonText: 'ใช่, ลบเลย!',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire({
        title: 'กำลังลบข้อมูล...',
        didOpen: () => { Swal.showLoading(); }
      });

      this.http.delete(this.urlbackend + "/api/v1/address/data/" + id_address)
        .subscribe({
          next: (response) => {
  
            Swal.fire({
              icon: 'success',
              title: 'ลบสำเร็จ!',
              text: 'ที่อยู่ของคุณถูกลบออกจากระบบแล้ว',
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
              text: 'ไม่สามารถลบที่อยู่ได้ในขณะนี้',
              confirmButtonColor: '#f44336'
            });
          }
        });
    }
  });
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

    totalCard(){
      this.total = 0;
      this.CardList.forEach((obj,index) => {
        this.total = this.total + Number(Number(this.counter2[index])*Number(obj.productModel.price_product))
      });

    }


//     CardSubmit(){
      
//       this.http.put(this.urlbackend +"/api/v1/card/data/",this.counter2).subscribe(response=>{
//         console.log(response);
//       })
// }

}
