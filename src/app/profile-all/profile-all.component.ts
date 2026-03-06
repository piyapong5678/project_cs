import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileAll } from './profileall-model';

@Component({
  selector: 'app-profile-all',
  templateUrl: './profile-all.component.html',
  styleUrls: ['./profile-all.component.scss']
})
export class ProfileAllComponent implements OnInit{

  ProfileAllList: ProfileAll[] = [];
  originalProfileAllList: ProfileAll[] = [];
  constructor(private http: HttpClient){}

  deleteProfile(id_user: String){
    if(confirm('ยืนยันการลบ'))
      {
        this.http.delete("http://localhost:8080/api/v1/user/data/"+id_user)
        .subscribe(response=>{
              console.log(response);
              window.location.reload()
            })
      }
  }

  ngOnInit(): void {
    this.http.get<ProfileAll[]>("http://localhost:8080/api/v1/user")
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
