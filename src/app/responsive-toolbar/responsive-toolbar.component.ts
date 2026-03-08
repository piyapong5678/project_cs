import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  

logout() {
 
  Swal.fire({
    title: 'ยืนยันการออกจากระบบ?',
    text: "คุณต้องการออกจากระบบใช่หรือไม่?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33', 
    cancelButtonColor: '#757575',
    confirmButtonText: 'ออกจากระบบ',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    
    if (result.isConfirmed) {
      sessionStorage.clear(); 
      
      
      Swal.fire({
        icon: 'success',
        title: 'ออกจากระบบสำเร็จ',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        
        this.router.navigate(['home']).then(() => {
          window.location.reload(); 
        });
      });
    }
  });
}
}
