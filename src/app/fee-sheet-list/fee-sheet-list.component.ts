import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../auth-service.service';
import { FeeSheetComponent } from '../fee-sheet/fee-sheet.component';

@Component({
  selector: 'app-fee-sheet-list',
  templateUrl: './fee-sheet-list.component.html',
  styleUrls: ['./fee-sheet-list.component.scss']
})
export class FeeSheetListComponent implements OnInit {
  dataTable:any = [];
  crudeRows:any = [];
  filterText: string = "";
  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.httpClient.post(environment.apiUrl, {api: "multi_view_all_feesheets", php_session_id: this.authService.phpSessionId} ).subscribe((data: any)=>{
      this.dataTable = Object.values(data.content);
       this.crudeRows = Object.values(data.content);
      })
  }

  public openFee(feeSheet:any) {
    const dialogRef = this.dialog.open(FeeSheetComponent, {data: feeSheet});
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

   

  filter() {
    const options = {
      keys: ['description', 'last_name', 'first_name', 'fee', 'standard_fee_label', 'state_label', 'add_date', 'use_date']
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
