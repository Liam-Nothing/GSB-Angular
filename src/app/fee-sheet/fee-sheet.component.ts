import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-fee-sheet',
  templateUrl: './fee-sheet.component.html',
  styleUrls: ['./fee-sheet.component.scss']
})
export class FeeSheetComponent implements OnInit {



  ngOnInit(): void {
    if (this.data) {
      this.buttonText = "Update"
      this.description = this.data.description;
      this.fee = this.data.fee;
      this.use_date = this.data.use_date;
      this.standard_fee = this.data.standard_fee
      this.id = this.data.fee_sheet_id
    }
  }
  id!: number;
  fee: string = "";
  use_date: string = "";
  description: string = "";
  standard_fee: string = "";
  error: string = "";
  is_end!: number;
  buttonText: string = "Submit";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthServiceService,
    private matDialogRef: MatDialogRef<FeeSheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public submitFeesheet(is_end: number) {
    this.is_end;
    this.fee;
    this.use_date;
    this.description;
    this.standard_fee;
    if (this.data) {
        this.httpClient.post(environment.apiUrl, {api: 'multi_update_feesheets', php_session_id: this.authService.phpSessionId, id_feesheet: this.id, fee: this.fee, use_date: this.use_date, description: this.description, standard_fee: this.standard_fee, state: is_end},)
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
      this.httpClient.post(environment.apiUrl, { api: 'multi_add_feesheets', php_session_id: this.authService.phpSessionId, fee: this.fee, use_date: this.use_date, description: this.description, standard_fee: this.standard_fee, state: is_end },)
        .subscribe(
          (success: any) => {
            console.log("success")
            if (success.id == 1) {
              this.matDialogRef.close()
            } else {
              this.error = success.message
            }
          });
    }
  }
}
