import { Component, OnInit } from '@angular/core';
import { CardProductModel, ProductModel, Sent } from './sent-payment-model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{

  SendList: Sent[] = [];
  profileUser: boolean = false;
  total: number = 0;
  file: File | undefined;
  fileCheck: boolean = true;
  constructor(private http: HttpClient){}

  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }

  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Sent[]>('http://localhost:8080/api/v1/send/send1/'+id_user).pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("send==>",this.SendList);
    });

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if(this.file){
      this.fileCheck = false;
    }
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
    let data = {
      status_send: "2",
    }
    console.log(formData);
    this.http.post('http://localhost:8080/api/v1/payment/data/file', formData).pipe().subscribe(response => {
      console.log("response,",response);
    });

    this.http.put('http://localhost:8080/api/v1/send/data/'+id_send,data).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })
  }

  
  cancel(id_send:String){
    let dataC = {
      status_send: "0",
    }
    this.http.put('http://localhost:8080/api/v1/send/data/'+id_send,dataC).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })
  }
}
