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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
 
  ngOnInit(): void {
    this.httpClient.post(environment.apiUrl, {api: "admin_view_all_feesheets", php_session_id: this.authService.phpSessionId} ).subscribe((data: any)=>{
      this.dataTable = Object.values(data)
      
    })
  }
  error:string = "";
  dataTable:any = [];

  public defaultColDef: ColDef = {
    resizable: true,
  };

  columnDefs: ColDef[] = [
    { field: 'id', width: 55 },
    { field: 'description' },
    { field: 'fee', width: 150},
    { field: 'add_date' },
    { field: 'use_date' },
    { field: 'state', width: 75 },
    { field: 'id_user', width: 90 },
    {field: 'standard_fee', width: 130}
];

rowData = [
  this.dataTable
];



  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
    ){}

    displayedColumns: string[] = ['id', 'description', 'fee', 'add_date', 'use_date', 'state', 'id_user', 'standard_fee'];
    

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

public debug() {
  this.router.navigate(['/login']);
}

public test() {
  console.log(this.rowData)
}

    
  openDialog() {
    const dialogRef = this.dialog.open(FeeSheetComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

