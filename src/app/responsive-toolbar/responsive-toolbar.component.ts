import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.scss'],
})
export class ResponsiveToolbarComponent implements OnInit {
  checkLoinUser : boolean = false;
  constructor(private _dialog: MatDialog,private router: Router) {}
  chekAddmin: boolean = false;
  roleCode: string = "";
  openAddLoginEmForm() {
    this._dialog.open(LoginComponent, {
      width: '600px',
    });
  }

  ngOnInit(): void {
    this.checkLoin();
  }
  checkLoin(){
    sessionStorage.hasOwnProperty('user');
    this.checkLoinUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));

    // JSON.stringify(this.addedObjectsAdminEdit.map(data => data.username))
    console.log(JSON.parse(sessionStorage.getItem('user')!).status_user);
    
    let user=JSON.parse(sessionStorage.getItem('user')!);
    this.roleCode=user.role_code;
  }
  

  logout(){
    sessionStorage.clear();
    window.location.reload()
    this.router.navigate(['home']);
  }
}
