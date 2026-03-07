import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-addmin-payment',
  templateUrl: './addmin-payment.component.html',
  styleUrls: ['./addmin-payment.component.scss']
})
export class AddminPaymentComponent implements OnInit{
  SendList: Sent[] = [];
  urlbackend = APP_CONFIG.URL_BACKEND;
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    
    this.http.get<Sent[]>(this.urlbackend +'/api/v1/send/addmin1').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("sendAddmin1==>",this.SendList);
    });
  }

  onSummitPayment(id_send:String){
    let data = {
      status_send: "3",
    }
    this.http.put(this.urlbackend +'/api/v1/send/data/'+id_send,data).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })
  }

}

