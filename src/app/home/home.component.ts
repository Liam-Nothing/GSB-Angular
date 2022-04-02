import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { FeeSheetComponent } from '../fee-sheet/fee-sheet.component';
import { AuthServiceService } from '../auth-service.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  ngOnInit(): void {

  }
  error:string = "";
  dataTable:any = "";
  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
    ){}

    public Logout() {
      this.httpClient.post(environment.apiUrl, {api:'user_lougout_session', php_session_id: this.authService.phpSessionId }).subscribe((success: any)=>{
        console.log("success")
        if(success.id == 1) {
          this.router.navigate(['/login']);
        } else {
          this.error = success.message
        }
      }),
      (error:any)=> {
        console.log("error", error);
      }
   }

   public GetUserFeesheets() {
     this.httpClient.post(environment.apiUrl, {api: "user_view_all_feesheets", php_session_id: this.authService.phpSessionId} ).subscribe((data: any)=>{
       console.log(data)
       this.dataTable = data
     })
   }
    
  openDialog() {
    const dialogRef = this.dialog.open(FeeSheetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



