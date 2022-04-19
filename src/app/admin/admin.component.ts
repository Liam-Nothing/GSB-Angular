import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { FeeSheetComponent } from '../fee-sheet/fee-sheet.component';
import { AuthServiceService } from '../auth-service.service';
import { ColDef, GridApi, ColumnApi, GridReadyEvent } from 'ag-grid-community';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddStandardFeesComponent } from '../add-standard-fees/add-standard-fees.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
 

  error:string = "";
  dataTable:any = [];

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
    ){}

    
    ngOnInit(): void {
      this.httpClient.post(environment.apiUrl, {api: "admin_view_all_feesheets", php_session_id: this.authService.phpSessionId} ).subscribe((data: any)=>{
        this.dataTable = Object.values(data.content);
      })
    }


    public Logout() {
      this.httpClient.post(environment.apiUrl, {api:'user_lougout_session', php_session_id: this.authService.phpSessionId }).subscribe((success: any)=>{
        console.log("success")
        if(success.id == 1) {
          this.router.navigate(['/login']);
        } else {
          this.error = success.message
          this.router.navigate(['/login'])
        }
      }),
      (error:any)=> {
        console.log("error", error);
      }
   }

   public openAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent);
    
   }

   public openAddStandardFees() {
     const dialogRef = this.dialog.open(AddStandardFeesComponent);
   }


public test() {
}

    
  public openFeesheetAdd() {
    const dialogRef = this.dialog.open(FeeSheetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

