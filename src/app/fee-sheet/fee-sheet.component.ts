import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    
  }
  public submitFeesheet() {
    this.fee;
    this.use_date;
    this.description;
    this.standard_fee;
    this.httpClient.post(environment.apiUrl + 'users/api_session_open.php', {fee:this.fee, use_date:this.use_date, description:this.description, standard_fee:this.standard_fee}).subscribe((success: any)=>{
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
