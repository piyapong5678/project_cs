import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addmin-cancel',
  templateUrl: './addmin-cancel.component.html',
  styleUrls: ['./addmin-cancel.component.scss']
})
export class AddminCancelComponent implements OnInit{

  SendList: Sent[] = [];

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.http.get<Sent[]>('http://localhost:8080/api/v1/send/addmin0').pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      
    });
  }

  deleteOrder(id_send : String){
    if(confirm('ยืนยันการลบ'))
      {
        this.http.delete("http://localhost:8080/api/v1/send/data/"+id_send)
        .subscribe(response=>{
              console.log(response);
              window.location.reload()
            })
      }
  }
}
