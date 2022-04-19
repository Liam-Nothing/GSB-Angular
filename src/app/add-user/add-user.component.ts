import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService,
    private matDialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit(): void {
  }
  username:string = "";
  password:string = "";
  email:string = "";
  first_name:string = "";
  last_name:string = "";
  birth_date:string = "";
  address:string = "";
  city:string = "";
  hire_date:string = "";
  id_role!:number ;
  zipcode:string = "";
  error:string = "";

  public addUser() {
   this.username;
   this.password;
   this.email;
   this.first_name;
   this.last_name;
   this.birth_date;
   this.address;
   this.city;
   this.hire_date;
   this.id_role;
   this.zipcode;
   this.httpClient.post(environment.apiUrl, {api: "admin_create_user", php_session_id: this.authService.phpSessionId, username:this.username, password:this.password, email:this.email, first_name:this.first_name, last_name:this.last_name, birth_date:this.birth_date, adress:this.address, city:this.city, hire_date:this.hire_date, id_role:this.id_role, zipcode:this.zipcode}).subscribe((success: any)=>{
    console.log("success")
    if(success.id == 1) {
      this.matDialogRef.close()
    } else {
      this.error = success.message
    }
  }),
  (error:any)=> {
    console.log("error", error);
  }
  }
  
}

