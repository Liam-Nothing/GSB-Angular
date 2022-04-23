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
 
  isLogged:number = 2;
  error:string = "";
  dataTable:any = [];
  crudeRows:any = [];
  filterText: string = "";

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
    ){}

    
    ngOnInit(): void {
//       this.httpClient.post(environment.apiUrl, {api: "all_logged_session", php_session_id: this.authService.phpSessionId} ).subscribe((logged: any)=>{
//      logged.id = this.isLogged
//     console.log(logged) })
//      console.log(this.isLogged)
// if (this.isLogged == 2 ) {
//   this.router.navigate(['/login'])
// }
      this.httpClient.post(environment.apiUrl, {api: "admin_view_all_feesheets", php_session_id: this.authService.phpSessionId} ).subscribe((data: any)=>{
      this.dataTable = Object.values(data.content);
       this.crudeRows = Object.values(data.content);
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
     const dialogRef = this.dialog.open(AddStandardFeesComponent)
   }
    
  public openFeesheetAdd() {
    const dialogRef = this.dialog.open(FeeSheetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  filter() {
    const options = {
      keys: ['description']
    }
    let fuse = new Fuse(this.crudeRows, options);
    if(this.filterText) {
      this.dataTable = fuse.search(this.filterText).map(element => element.item);
    }
    else {
      this.dataTable = this.crudeRows;
    }
  }
}

