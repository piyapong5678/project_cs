import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-wait-sent',
  templateUrl: './wait-sent.component.html',
  styleUrls: ['./wait-sent.component.scss']
})
export class WaitSentComponent implements OnInit{
  urlbackend = APP_CONFIG.URL_BACKEND;
  SendList: Sent[] = [];
  profileUser: boolean = false;
  
  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/send3/'+id_user).pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("send==>",this.SendList);
    });
  }
}
