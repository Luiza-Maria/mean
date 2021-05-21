import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from './menu-model';
import { Order } from './order-model';
import { MenuservService } from './menuserv.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddMenuComponent } from './dialog-add-menu/dialog-add-menu.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: Menu[] = [];
  @ViewChild('exampleModalCenter', { static: false }) modal: ElementRef;
  twoItemsOfMenu: Menu[] = [];
  nbOfClick: number = 0;
  otherMenu = [];
  subs: Subscription;
  nbTable: string = '';
  orderArr: Menu[] = [];
  orderDb;
  isAuth: boolean;
  subscription: Subscription;
  index1: number = 0;
  index2: number = 2;
  getIndex(x) {
    return x;
  }
 

  constructor(private menuServ: MenuservService, public dialog: MatDialog, public router: Router, private authServ: AuthServiceService) {
    this.subs = this.menuServ.getNbTable().subscribe(nb => this.nbTable = nb);
   }

  ngOnInit(): void {
    this.menuServ.getMenu()
      .subscribe(menu => {
        this.menu = menu
        this.otherMenu = this.menu.slice(0, 2);
      });
    console.log("Menu " + this.nbTable);
    this.menuServ.getOrder().subscribe(ord => {
      this.orderDb = ord;
      console.log(this.orderDb);
    });
    console.log("auth: " + this.isAuth);
    this.isAuth = this.authServ.userIsRegistered;
  }

  myOrder() {
    this.router.navigate(['./get-order']);   
  }
  
  addMenu() {
    const dialogRef = this.dialog.open(DialogAddMenuComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  prevMenu() {

    if (this.index1 == 0 && this.index2 == 2) {    
      this.index1 = this.menu.length - 2;
      this.index2 = this.menu.length;
      this.otherMenu = this.menu.slice(this.index1, this.index2);
    
    } else if (this.index1 > 2 || this.index1 == 2) {
      this.index1 = this.index1 - 2;
      this.index2 = this.index2 - 2;
      this.otherMenu = this.menu.slice(this.index1, this.index2);
    }
    else {
      this.otherMenu = [this.menu[this.menu.length - 1], this.menu[0]];
      this.index1 = 8;
      this.index2 = 10;
    }
    console.log("Index1: " + this.index1);
    console.log("Index2: " + this.index2);
  }

  nextMenu() {
    if ((this.index1 == this.menu.length - 2 && this.index2 == this.menu.length) || (this.index1 == this.menu.length-1))  {
      this.index1 = -2; 
      this.index2 = 0;
      this.otherMenu = this.menu.slice(this.index1, this.index2);
    }
    this.index1 =this.getIndex(this.index1) + 2;
    this.index2 = this.getIndex(this.index2) + 2;
    this.otherMenu = this.menu.slice(this.index1, this.index2);
    console.log("Index1: " + this.index1);
    console.log("Index2: " + this.index2);
    console.log("menu length: " + this.menu.length);
  }
 
  updateItem(mn) {
    this.addMenu();
    this.menuServ.sendMenuToUpdate(mn);
  }

  deleteItem(id) {
    this.menuServ.deleteMenu(id).subscribe();
  }

  addItemToOrder(food) { 
    this.orderArr.push(food);
  }

  sendOrder() {
    if (this.nbTable !== "") {
      const orderFood: Order = {
        id: parseInt(this.nbTable),
        nbTable: this.nbTable,
        order: this.orderArr
      };
      this.menuServ.addOrder(orderFood).subscribe(() => {
        console.log(orderFood);
        this.router.navigate(['./get-order']);
      });
    } else alert("Please go to the home page and select a table!");
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
