import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  regisForm  = new FormGroup({

    firstname_user: new FormControl('', Validators.required),
    lastname_user: new FormControl('', Validators.required),
    phone_user: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    email_user: new FormControl('', [Validators.required, Validators.email]),
    password_user: new FormControl('', Validators.required),
    status_user: new FormControl('ลูกค้า'),
  });

  constructor(private http: HttpClient){}

  onSubmit(){
    debugger;
    const obj = this.regisForm.value;
    this.http.post('http://localhost:8080/api/v1/user/data',obj).subscribe((res:any)=>{
      window.location.reload();
    })
  }
  hide = true;
}
