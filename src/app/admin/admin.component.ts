import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { FeeSheetComponent } from '../fee-sheet/fee-sheet.component';
import { AuthServiceService } from '../auth-service.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddStandardFeesComponent } from '../add-standard-fees/add-standard-fees.component';
import Fuse from 'fuse.js';
import { empty } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
 
  isLogged!:number
  error:string = "";
 

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
    ){}

    
    ngOnInit(): void {
      this.httpClient.post(environment.apiUrl, {api: "all_logged_session", php_session_id: this.authService.phpSessionId} ).subscribe((logged: any)=>{
      this.isLogged = logged.id
    console.log(logged) })
     console.log(this.isLogged)
if (this.isLogged == 2 ) {
  this.router.navigate(['/login'])
}
    }


    public Logout() {
      this.httpClient.post(environment.apiUrl, {api:'all_logout_session', php_session_id: this.authService.phpSessionId }).subscribe((success: any)=>{
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
     const dialogRef = this.dialog.open(AddStandardFeesComponent)
   }
    
  public openFeesheetAdd() {
    const dialogRef = this.dialog.open(FeeSheetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

