import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FeeSheetComponent } from './fee-sheet/fee-sheet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';
import { AdminComponent } from './admin/admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddStandardFeesComponent } from './add-standard-fees/add-standard-fees.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FeeSheetComponent,
    AdminComponent,
    AddUserComponent,
    AddStandardFeesComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    NgxDatatableModule,
    AgGridModule.withComponents([])
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
