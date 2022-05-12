import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { environment } from 'src/environments/environment';
import { AddStandardFeesComponent } from '../add-standard-fees/add-standard-fees.component';
import { AuthServiceService } from '../auth-service.service';
import { FeeSheetComponent } from '../fee-sheet/fee-sheet.component';

@Component({
  selector: 'app-standard-fee-sheet-list',
  templateUrl: './standard-fee-sheet-list.component.html',
  styleUrls: ['./standard-fee-sheet-list.component.scss']
})
export class StandardFeeSheetListComponent implements OnInit {

  dataTable:any = [];
  crudeRows:any = [];
  filterText: string = "";
  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.httpClient.post(environment.apiUrl, {api: "all_get_standard_fees", php_session_id: this.authService.phpSessionId} ).subscribe((data: any)=>{
      this.dataTable = Object.values(data.content);
      console.log(data)
       this.crudeRows = Object.values(data.content);
      })
  }

  public openStandardFee(StandardFee:any) {
    const dialogRef = this.dialog.open(AddStandardFeesComponent, {data: StandardFee});
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

   

  filter() {
    const options = {
      keys: ['id', 'label', 'fee']
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
