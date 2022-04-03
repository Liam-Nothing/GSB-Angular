import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-fee-sheet',
  templateUrl: './fee-sheet.component.html',
  styleUrls: ['./fee-sheet.component.css']
})
export class FeeSheetComponent implements OnInit {



  ngOnInit(): void {
  }

  fee:string = "";
  use_date:string = "";
  description:string = "";
  standard_fee:string = "";
  error:string = "";
  is_end!: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
  ) {
    
  }
  public submitFeesheet(is_end: number) {
    this.is_end;
    this.fee;
    this.use_date;
    this.description;
    this.standard_fee;
    this.httpClient.post(environment.apiUrl, {api:'user_add_feesheets', php_session_id: this.authService.phpSessionId, fee:this.fee, use_date:this.use_date, description:this.description, standard_fee:this.standard_fee, is_end: is_end},).subscribe((success: any)=>{
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
