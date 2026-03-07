import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from './profile-get';
import { APP_CONFIG } from '../shared/constants/constants';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  urlbackend = APP_CONFIG.URL_BACKEND;
  profileUser: boolean = false;
  file: File | undefined;
  fileCheck: boolean = true;
  Profile = new FormGroup({
    id_profile: new FormControl(''),
    firstname_user: new FormControl('', Validators.required),
    lastname_user: new FormControl('', Validators.required),
    phone_user: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    email_user: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private http: HttpClient) { }
  chekprofile(){
    sessionStorage.hasOwnProperty('user');
    this.profileUser = sessionStorage.hasOwnProperty('user');
    console.log(sessionStorage.hasOwnProperty('user')); 
  }
  ngOnInit(): void {
    this.chekprofile();
    let id_user= JSON.parse(sessionStorage.getItem('user')!).id_user;
    console.log("id==>",id_user);
    this.http.get<Profile>(this.urlbackend +'/api/v1/user/data/'+id_user).pipe()
    .subscribe((response: Profile) => {
      this.Profile.controls['firstname_user'].setValue(response.firstname_user);
      this.Profile.controls['lastname_user'].setValue(response.lastname_user);
      this.Profile.controls['phone_user'].setValue(response.phone_user);
      this.Profile.controls['email_user'].setValue(response.email_user);
      console.log(response.firstname_user);

  });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if(this.file){
      this.fileCheck = false;
    }
  }
  onsubmit(){
    let id_user= JSON.parse(sessionStorage.getItem('user')!).id_user;
    console.log("data==>",this.Profile.value);
    this.http.put(this.urlbackend +'/api/v1/user/data/'+id_user,this.Profile.value).subscribe(response=>{
      console.log(response);
      window.location.reload()
    })

    // const formData = new FormData();
    // formData.append('id_user',id_user.toString());
    // formData.append('file', this.file!);
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "multipart/form-data"
    //   })
    // }
    // this.http.post(this.urlbackend +'/api/v1/user/data/file', formData).pipe().subscribe(response => {
    //   console.log("response,",response);
    // });
  }



}
