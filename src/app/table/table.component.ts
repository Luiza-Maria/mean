import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../menu/order-model';
import { MenuservService } from '../menu/menuserv.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  status: boolean = true;
  nbTable = [
    { nb: 1, active: true },
    { nb: 2, active: true },
    { nb: 3, active: true },
    { nb: 4, active: true },
    { nb: 5, active: true },
    { nb: 6, active: true },
    { nb: 7, active: true },
    { nb: 8, active: true },
    { nb: 9, active: true }
  ];
  order: Order[] = [];
  occuped = [];
  
  constructor(private menuServ: MenuservService, private router: Router, private el:ElementRef) { }

  ngOnInit(): void {
    this.menuServ.getOrder()
      .subscribe( mn => { this.order = mn;
      if (this.order.length > 0) {
        for (var i = 0; i < this.order.length; i++) {
        for (var j = 0; j < this.nbTable.length; j++) {
          if (this.nbTable[j].nb == parseInt(this.order[i].nbTable)) {
            this.nbTable[j].active = false;        
            } 
          }       
        }   
        console.log(this.order);
      }
    });
  }

  getTable(ev: any) {
      this.menuServ.sendNbTable(ev.target.innerHTML);
      this.router.navigate(['./menu']);
  }
}
