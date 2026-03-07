import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-addmin-send-success',
  templateUrl: './addmin-send-success.component.html',
  styleUrls: ['./addmin-send-success.component.scss']
})
export class AddminSendSuccessComponent implements OnInit{

  urlbackend = APP_CONFIG.URL_BACKEND;
  SendList: Sent[] = [];


  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/addmin4').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      
    });
  }
}
