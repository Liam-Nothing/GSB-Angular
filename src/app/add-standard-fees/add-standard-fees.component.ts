import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-standard-fees',
  templateUrl: './add-standard-fees.component.html',
  styleUrls: ['./add-standard-fees.component.scss']
})
export class AddStandardFeesComponent implements OnInit {

  ngOnInit(): void {
    if (this.data) {
      this.buttonText = "Update"
      this.label = this.data.label;
      this.fee = this.data.fee;}
  }
  buttonText:string = "Ajouter"
  label:string = "";
  fee:string = "";
  error:string = "";


  constructor(    
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService,
    private matDialogRef: MatDialogRef<AddStandardFeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    public addStandardFees() {
      this.label
      this.fee
      this.httpClient.post(environment.apiUrl, {api: "multi_add_standard_fees", php_session_id: this.authService.phpSessionId, fee:this.fee, label:this.label},).subscribe((success: any)=>{
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
