import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';
import { Router } from '@angular/router';
import { Address } from './address-model';
import { HttpClient } from '@angular/common/http';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { APP_CONFIG } from '../shared/constants/constants';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],

})

export class AddressComponent implements OnInit {
  
  constructor(private _dialog: MatDialog, private router: Router, private http: HttpClient) { }
  urlbackend = APP_CONFIG.URL_BACKEND;
  AddressList: Address[] = [];
  profileUser: boolean = false;
  openAddAddress() {
    this._dialog.open(AddAddressComponent);
  }

  EditAddress(id_address: String) {
    const dialogRef = this._dialog.open(EditAddressComponent,{
      data: {id: id_address},
    });
    console.log(id_address);
  }
  chekprofile() {
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }
  deleteProfile(id_address: String) {
    if (confirm('ยืนยันการลบ')) {
      this.http.delete(this.urlbackend +"/api/v1/address/data/" + id_address)
        .subscribe(response => {
          console.log(response);
          window.location.reload()
        })
    }
  }


  ngOnInit(): void {
    this.chekprofile();
    let id_user = JSON.parse(sessionStorage.getItem('user')!).id_user;
    this.http.get<Address[]>(this.urlbackend +"/api/v1/address/userAddress/" + id_user)
      .subscribe(response => {
        console.log(response);
        this.AddressList = response;
      })
  }

}
