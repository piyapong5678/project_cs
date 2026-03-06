import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from '../address/address-model';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit{
  EditAressForm = new FormGroup({

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Address>('http://localhost:8080/api/v1/address/data/'+this.data.id).pipe()
    .subscribe((response: Address) => {
    this.EditAressForm.controls['housenumber_address'].setValue(response.housenumber_address);
    this.EditAressForm.controls['village_address'].setValue(response.village_address);
    this.EditAressForm.controls['housename_address'].setValue(response.housename_address);
    this.EditAressForm.controls['road_address'].setValue(response.road_address);
    this.EditAressForm.controls['subdistrict_address'].setValue(response.subdistrict_address);
    this.EditAressForm.controls['district_address'].setValue(response.district_address);
    this.EditAressForm.controls['prefecture_address'].setValue(response.prefecture_address);
    this.EditAressForm.controls['province_address'].setValue(response.province_address);
    this.EditAressForm.controls['postcode_address'].setValue(response.postcode_address);
    this.EditAressForm.controls['firstname_address'].setValue(response.firstname_address);
    this.EditAressForm.controls['lastname_address'].setValue(response.lastname_address);
    this.EditAressForm.controls['phone_address'].setValue(response.phone_address);
    console.log(response);

});
  }

  onSubmit(){
    this.http.put('http://localhost:8080/api/v1/address/data/'+this.data.id,this.EditAressForm.value).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })
  }
}
