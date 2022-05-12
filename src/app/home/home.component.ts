import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { FeeSheetComponent } from '../fee-sheet/fee-sheet.component';
import { AuthServiceService } from '../auth-service.service';
import { ColDef, GridApi, ColumnApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  ngOnInit(): void {
  }

error:string = ""



  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
    ){}

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



    
  openDialog() {
    const dialogRef = this.dialog.open(FeeSheetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

