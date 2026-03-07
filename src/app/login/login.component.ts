import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { LoginDataModel } from '../shared/models/loginData.model';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  urlbackend = APP_CONFIG.URL_BACKEND;
  public loginModel!: LoginDataModel;

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );
  }

  constructor(private _dilog: MatDialog, private http: HttpClient) { }

  openRegisterEmForm() {
    const dialogRef = this._dilog.open(RegisterComponent, {
      width: '600px',
    })

  }

  hide = true;
  // get emailInput() { return this.loginForm.get('email'); }
  // get passwordInput() { return this.loginForm.get('password'); }  

  onLogin() {
    const obj = {
      email_user: this.loginForm.value.email,
      password_user: this.loginForm.value.password,
    }

    console.log(obj);

    this.http.post(this.urlbackend+'/api/v1/login', obj).subscribe((res: any) => {
      console.log(res);


      if (res.id_user == null) {
        console.log("ไม่มีอีเมล");
        sessionStorage.clear()

      } else if (res.status_login) {
        console.log("login สำเร็จ");
        sessionStorage.setItem('user', JSON.stringify(res))
        window.location.reload()
      } else {
        console.log("รหัสผ่านไม่่ถูกต้อง");
        sessionStorage.clear()
      }

    })

    console.log(this.loginModel);
  }
}
  

