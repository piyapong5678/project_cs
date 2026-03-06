import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cancel-product',
  templateUrl: './cancel-product.component.html',
  styleUrls: ['./cancel-product.component.scss']
})
export class CancelProductComponent implements OnInit{
  SendList: Sent[] = [];
  profileUser: boolean = false;

  constructor(private http: HttpClient){}

  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }
  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Sent[]>('http://localhost:8080/api/v1/send/send0/'+id_user).pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      
    });
  }
  
}
