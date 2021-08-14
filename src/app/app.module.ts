import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from './menu/menu.component';
import { GetOrderComponent } from './menu/get-order/get-order.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { DialogAddMenuComponent } from './menu/dialog-add-menu/dialog-add-menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { MenuservService } from './menu/menuserv.service';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthComponent } from './auth/auth/auth.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { LoginComponent } from './auth/signin/login/login.component';
import { ForgotPassComponent } from './auth/signin/forgot-pass/forgot-pass.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GetOrderComponent,
   
    DialogAddMenuComponent,
    TableComponent,
    NavigationComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    ForgotPassComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSliderModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule ,
    MatTableModule,
  ],
  providers: [MenuservService],
  bootstrap: [AppComponent]
})
export class AppModule { }
