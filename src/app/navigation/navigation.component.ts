import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { DialogAddMenuComponent } from '../menu/dialog-add-menu/dialog-add-menu.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  subscription: Subscription;
  isAuth: boolean;
  public innerWidth: any;
  menuText = "Menu";

  constructor(public dialog: MatDialog, public router: Router, private authServ: AuthServiceService) { 
   }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.isAuth = this.authServ.userIsRegistered;
    this.authServ.autoLogin();
  }

  logOut() {
    this.authServ.logOut();
    this.isAuth = false;
  }
  
  addMenu() {
    const dialogRef = this.dialog.open(DialogAddMenuComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
