import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-standard-fees',
  templateUrl: './add-standard-fees.component.html',
  styleUrls: ['./add-standard-fees.component.scss']
})
export class AddStandardFeesComponent implements OnInit {

  ngOnInit(): void {
  }

  label:string = "";
  fee:string = "";
  error:string = "";


  constructor(    
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService,
    private matDialogRef: MatDialogRef<AddStandardFeesComponent>
    ) { }

    public addStandardFees() {
      this.label
      this.fee
      this.httpClient.post(environment.apiUrl, {api: "admin_add_standard_fees", php_session_id: this.authService.phpSessionId, fee:this.fee, label:this.label},).subscribe((success: any)=>{
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
