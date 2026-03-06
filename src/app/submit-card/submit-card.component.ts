import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, ProductModel } from '../cart-product/card-model';
import { Address } from '../address/address-model';
import { FormControl, FormGroup } from '@angular/forms';
import { Sent } from '../payment/sent-payment-model';

@Component({
  selector: 'app-submit-card',
  templateUrl: './submit-card.component.html',
  styleUrls: ['./submit-card.component.scss']
})
export class SubmitCardComponent implements OnInit{
  profileUser: boolean = false;
  CardList: Card[] = [];
  Address_id!: any;
  AddressList!: Address;
  ProductList!: Card;
  total: number = 0;
  fullname: String = "";
  address: String = "";

  file: File | undefined;
  
  sent: Sent | undefined;

  fileCheck: boolean = true;
  constructor(private router: Router, private http: HttpClient,private router1: ActivatedRoute,private router2: Router){}


    blackCard(){
      this.router.navigate(['shopping-card']);
    }
    chekprofile() {
      sessionStorage.hasOwnProperty('user');
      this.profileUser = sessionStorage.hasOwnProperty('user');
      console.log(sessionStorage.hasOwnProperty('user'));
    }
    
    ngOnInit(): void {
      this.Address_id = this.router1.snapshot.paramMap.get('id');
      this.http.get<Address>('http://localhost:8080/api/v1/address/data/'+this.Address_id)
      .subscribe((response: Address) => {
        this.AddressList = response;
        this.fullname = this.AddressList.firstname_address + " " + this.AddressList.lastname_address;
        this.address = " บ้านเลขที่."+ " "  + this.AddressList.housenumber_address+ " " + "หมู่." + " " + this.AddressList.village_address + " " + "บ้าน/อาคาร."
        +this.AddressList.housename_address + " "  + "ซอย." + this.AddressList.subdistrict_address + " " + "ถนน/แยก."+ this.AddressList.road_address+" " + "ตำบล/เขต."+
        this.AddressList.district_address+" "+"อำเภอ/แขวง."+this.AddressList.prefecture_address+" "+"จังหวัด."+this.AddressList.province_address+" "+this.AddressList.postcode_address+" "+ "เบอร์โทร."+this.AddressList.phone_address+"."
    });

      this.chekprofile();
      let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
      this.http.get<Card[]>('http://localhost:8080/api/v1/card/data-list/'+id_user).pipe()
      .subscribe((response: Card[]) => {
        this.CardList=response;
        this.totalCard();
        // this.CardList.forEach((obj,index) =>{
        //   this.total= this.total + Number(Number(this.ProductList.productModel.number_product[index])*Number(obj.productModel.price_product))
        // })
        // this.total= this.total + Number(Number(this.ProductList.productModel.number_product)*Number(this.ProductList.productModel.price_product));
      console.log(response);
  });
    }
    

    Submit(){
      // this.chekprofile();
      let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
      this.Address_id = this.router1.snapshot.paramMap.get('id');
      let data = {
        id_user: id_user,
        id_address: this.Address_id,
        status_send: "2",
        id_card: JSON.stringify(this.CardList.map(data => data.id_card)),
        paymentModel: {total_payment: this.total,status_payment:"1"},
      }

      

      // let data1 = {

      // }

      // this.http.post('http://localhost:8080/api/v1/payment/data',data).subscribe(response=>{
      //   console.log(response);
      // })

      this.http.post('http://localhost:8080/api/v1/send/data',data).subscribe(response=>{
        
        this.sent = response as Sent;
        this.onPayment(this.sent.id_send);
        // console.log("sentsentsent ==>> ",this.sent.id_send);
        // this.category = obj.category as Category[];
        this.router2.navigate(['home']);
      })


      // console.log(data);
    }

    onPayment(id_send:String){

      const formData = new FormData();
      formData.append('id_send', id_send.toString());
      formData.append('file', this.file!);
      let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "multipart/form-data"
        })
      }
      console.log(formData);
      this.http.post('http://localhost:8080/api/v1/payment/data/file', formData).pipe().subscribe(response => {
        console.log("response,",response);
      });
    }
    
    cross(){
      let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
      this.Address_id = this.router1.snapshot.paramMap.get('id');
      let data = {
        id_user: id_user,
        id_address: this.Address_id,
        status_send: "1",
        id_card: JSON.stringify(this.CardList.map(data => data.id_card)),
        paymentModel: {total_payment: this.total,status_payment:"0"},
      }
      this.http.post('http://localhost:8080/api/v1/send/data',data).subscribe(response=>{
        // console.log(response);
        this.router2.navigate(['home']);
      })
    }
    
    totalCard(){
      this.total = 0;
      this.CardList.forEach((obj,index) => {
      this.total = this.total + Number(Number(obj.number_card)*Number(obj.productModel.price_product));
      });
      // console.log(this.CardList);
      console.log("total==",this.total);

    }

    onFileSelected(event: any) {
      this.file = event.target.files[0];
      if(this.file){
        this.fileCheck = false;
      }
    }
    // totalCard(){
    //   this.total = 0;
    //   this.total = this.total + Number(Number(this.ProductList.productModel.number_product)*Number(this.ProductList.productModel.price_product));
      
    //   console.log("total==>",this.total);
    // }
    

}
