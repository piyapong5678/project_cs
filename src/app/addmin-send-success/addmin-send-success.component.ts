import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addmin-send-success',
  templateUrl: './addmin-send-success.component.html',
  styleUrls: ['./addmin-send-success.component.scss']
})
export class AddminSendSuccessComponent implements OnInit{


  SendList: Sent[] = [];


  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Sent[]>('http://localhost:8080/api/v1/send/addmin4').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      
    });
  }
}
