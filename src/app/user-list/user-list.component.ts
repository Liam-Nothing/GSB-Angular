import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { environment } from 'src/environments/environment';
import { AddUserComponent } from '../add-user/add-user.component';
import { AuthServiceService } from '../auth-service.service';
import { FeeSheetComponent } from '../fee-sheet/fee-sheet.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  dataTable:any = [];
  crudeRows:any = [];
  filterText: string = "";

  constructor(
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private router: Router,
    private authService:AuthServiceService
  ) { }

  ngOnInit(): void {
    this.httpClient.post(environment.apiUrl, {api: "admin_list_user", php_session_id: this.authService.phpSessionId} ).subscribe((data: any)=>{
      this.dataTable = Object.values(data.content);
       this.crudeRows = Object.values(data.content);
      })
  }

  public openUser(user:any) {
    const dialogRef = this.dialog.open(AddUserComponent, {data: user});
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  filter() {
    const options = {
      keys: ['first_name', 'last_name', 'city', 'zipcode', 'role_label', 'email', 'username']
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
