import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  username:string = "";
  password:string = "";
  error:string = "";

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    
  }

  public submitLogin() {
    this.username;
    this.password;
    this.httpClient.post(environment.apiUrl, {api: 'user_open_session', username:this.username, password:this.password}).subscribe((success: any)=>{
      console.log("success")
      if(success.id == 1) {
        this.router.navigate(['/home']);
      } else {
        this.error = success.message
      }
    }),
    (error:any)=> {
      console.log("error", error);
    }
 }

}
