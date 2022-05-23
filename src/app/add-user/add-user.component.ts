import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private matDialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.buttonText = "Update"
      this.first_name = this.data.first_name;
      this.last_name = this.data.last_name;
      this.username = this.data.username;
      this.password = this.data.password;
      this.email = this.data.email;
      this.birth_date = this.data.birth_date;
      this.address = this.data.address;
      this.city = this.data.city;
      this.hire_date = this.data.hire_date;
      this.id_role = this.data.id_role;
      this.zipcode = this.data.zipcode;
      this.role_label = this.data.role_label;
    }
  }
  //TODO #5
  buttonText: string = "Créer"
  username!:string;
  password!:string ;
  email!:string ;
  first_name!:string;
  last_name!:string;
  birth_date!:string;
  address!:string ;
  city!:string ;
  hire_date!:string ;
  id_role!:number ;
  role_label!:string ;
  zipcode!:string;
  error!:string ;

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
   this.role_label;
   if (this.data) {
    this.httpClient.post(environment.apiUrl, {api: 'admin_update_user', php_session_id: this.authService.phpSessionId, username:this.username, password:this.password, email:this.email, first_name:this.first_name, last_name:this.last_name, birth_date:this.birth_date, adress:this.address, city:this.city, hire_date:this.hire_date, id_role:this.id_role, zipcode:this.zipcode},)
    .subscribe(
      (success: any) => {
        console.log(success)
        if (success.id == 1) {
          this.matDialogRef.close()
        } else {
          this.error = success.message
        }
      });
} else {
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
  
}

