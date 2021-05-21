import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../menu-model';
import {Order } from '../order-model';
import { MenuservService } from '../menuserv.service';
// import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';


@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent implements OnInit {
  orderDb;
  orderDatabase;;
  totalPrice: number = 0;

  constructor(private menuServ: MenuservService,private router:Router,private authServ: AuthServiceService) { }

  ngOnInit(): void {
    this.getMenu();
    this.getOrd();
  }

  getOrd(){
     return this.menuServ.getOrder().subscribe(ord => {
      this.orderDatabase = ord;
      console.log(this.orderDatabase);
    });
    
}
  getMenu() {
    this.menuServ.getOrder().subscribe(order => {
      this.orderDb = order;
      this.getTotal(this.orderDb);
      console.log("Order" +order)
    });
  }
  
  getTotal(data:Order) {  
      this.totalPrice = 0;
      for (let j = 0; j < data.order.length; j++) {
        this.totalPrice += data.order[j].price;
      }
      return this.totalPrice;
  }

  deleteOrder(id) {
    this.menuServ.deleteOrder(id).subscribe(() =>
    { this.getOrd(); });
    window.location.reload();  
  }

  backToHome() {
    this.router.navigate(['./home']);
  }
}

    
    
  
 


