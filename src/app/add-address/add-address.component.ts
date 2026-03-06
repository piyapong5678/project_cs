import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit{
  profileUser: boolean = false;
  addAdressForm = new FormGroup({
    id_address: new FormControl(''),
    housenumber_address: new FormControl('', Validators.required),
    village_address: new FormControl(''),
    housename_address: new FormControl('',Validators.required ),
    // alley_address: new FormControl(''),
    road_address: new FormControl(''),
    subdistrict_address: new FormControl(''),
    district_address: new FormControl('', Validators.required),
    prefecture_address: new FormControl('', Validators.required),
    province_address: new FormControl('',Validators.required),
    postcode_address: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{5}")]),
    firstname_address: new FormControl('',Validators.required),
    lastname_address: new FormControl('',Validators.required),
    phone_address: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")])
  });

  constructor(private http: HttpClient){}
  chekprofile(){
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user'));
  }
  
  ngOnInit(): void {
  
  }
  
  onSubmit(){
    this.chekprofile();
    let id_user= JSON.parse(sessionStorage.getItem('user')!).id_user;
    let data = {
      housenumber_address: this.addAdressForm.value.housenumber_address,
      village_address: this.addAdressForm.value.village_address,
      housename_address: this.addAdressForm.value.housename_address,
      // alley_address: this.addAdressForm.value.alley_address,
      road_address: this.addAdressForm.value.road_address,
      subdistrict_address: this.addAdressForm.value.subdistrict_address,
      district_address: this.addAdressForm.value.district_address,
      prefecture_address:this.addAdressForm.value.prefecture_address,
      province_address: this.addAdressForm.value.province_address,
      postcode_address: this.addAdressForm.value.postcode_address,
      firstname_address: this.addAdressForm.value.firstname_address,
      lastname_address:  this.addAdressForm.value.lastname_address,
      phone_address:     this.addAdressForm.value.phone_address,
      id_user: id_user,
    }
    console.log("data==>",data)
    this.http.post('http://localhost:8080/api/v1/address/data',data).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
    })

  }
}



