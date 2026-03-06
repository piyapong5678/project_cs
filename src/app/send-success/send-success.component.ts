import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Sent } from '../payment/sent-payment-model';

@Component({
  selector: 'app-send-success',
  templateUrl: './send-success.component.html',
  styleUrls: ['./send-success.component.scss']
})
export class SendSuccessComponent implements OnInit{

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
    this.http.get<Sent[]>('http://localhost:8080/api/v1/send/send4/'+id_user).pipe()
    .subscribe((response: Sent[]) => {  
      this.SendList = response;
      console.log("send==>",this.SendList);
    });
  }

  receive(id_send:String){
    let data = {
      status_send: "5",
    }
    this.http.put('http://localhost:8080/api/v1/send/data/'+id_send,data).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })
  }
}
