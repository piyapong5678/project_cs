import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileAll } from './profileall-model';
import { APP_CONFIG } from '../shared/constants/constants';

@Component({
  selector: 'app-profile-all',
  templateUrl: './profile-all.component.html',
  styleUrls: ['./profile-all.component.scss']
})
export class ProfileAllComponent implements OnInit{
  urlbackend = APP_CONFIG.URL_BACKEND;
  ProfileAllList: ProfileAll[] = [];
  originalProfileAllList: ProfileAll[] = [];
  constructor(private http: HttpClient){}

  deleteProfile(id_user: String){
    if(confirm('ยืนยันการลบ'))
      {
        this.http.delete(this.urlbackend +"/api/v1/user/data/"+id_user)
        .subscribe(response=>{
              console.log(response);
              window.location.reload()
            })
      }
  }

  ngOnInit(): void {
    this.http.get<ProfileAll[]>(this.urlbackend +"/api/v1/user")
    .subscribe(response=>{
      console.log(response);
      this.ProfileAllList = response;
      this.originalProfileAllList = response;
    })
  }

  onKeyAll(event: any) {
    this.ProfileAllList = this.originalProfileAllList.filter((data) =>
      data.firstname_user.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }
}
