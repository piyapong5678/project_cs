import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addmin-wait-sent',
  templateUrl: './addmin-wait-sent.component.html',
  styleUrls: ['./addmin-wait-sent.component.scss']
})
export class AddminWaitSentComponent implements OnInit{

  SendList: Sent[] = [];

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.http.get<Sent[]>('http://localhost:8080/api/v1/send/addmin3').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      
    });
  }

  onSummitSend(id_send:String){
    let data = {
      status_send: "4",
    }
    this.http.put('http://localhost:8080/api/v1/send/data/'+id_send,data).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })
  }
}
