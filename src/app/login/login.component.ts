import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  username:string = "";
  password:string = "";
  error:string = "";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthServiceService
  ) {
    
  }

  public submitLogin() {
    this.username;
    this.password;
    this.authService.login(this.username, this.password).subscribe((success: any)=>{
      console.log(success)
      if(success.id == 1 && success.id_role == 0) {
        this.router.navigate(['/home']);
      } else if(success.id == 1 && success.id_role == 3) {
        this.router.navigate(['/admin']);
      }else {
        this.error = success.message
      }
    }),
    (error:any)=> {
      console.log("error", error);
    }
 }

}

