import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-wait-payment',
  templateUrl: './wait-payment.component.html',
  styleUrls: ['./wait-payment.component.scss']
})
export class WaitPaymentComponent implements OnInit{

  SendList: Sent[] = [];
  profileUser: boolean = false;
  urlbackend = APP_CONFIG.URL_BACKEND;
  constructor(private http: HttpClient){}

  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }

  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/send2/'+id_user).pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("send==>",this.SendList);
    });
  }
}
