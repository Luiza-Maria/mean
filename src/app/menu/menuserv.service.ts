import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { Menu } from './menu-model';
import { Order } from './order-model';


@Injectable({
  providedIn: 'root'
})
export class MenuservService {



  private menuToUpdate = new Subject<Menu>();
  updateMode: boolean = false;

  private nbTable = new BehaviorSubject<string>('');


  
  constructor(private http: HttpClient, private auth: AuthServiceService) { } 

  sendMenuToUpdate(menu) {
    this.updateMode = true;
    this.menuToUpdate.next(menu);
    
  }

  getMenuToUpdate() {
    return this.menuToUpdate.asObservable();
  }

  sendNbTable(nb) {
    this.nbTable.next(nb);
    console.log("From service: " + nb);
  }

  getNbTable() {
    return this.nbTable.asObservable();
  }
  
  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('http://localhost:3000/menu');
  }
  postMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>('http://localhost:3000/menu', menu);
  }
  
  updateItem(mn): Observable<Menu> {
    return this.http.put<Menu>('http://localhost:3000/menu/' + mn._id, mn);
  }

  deleteMenu(id): Observable<Menu> {
    return this.http.delete<Menu>('http://localhost:3000/menu/' + id);
  }
  
  addOrder(order): Observable<{ nb: string, Menu }> {
    return this.http.post<{ nb: string, Menu }>('http://localhost:8000/order', order);
  }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8000/order');
  }

  deleteOrder(id:number): Observable<Order> {
    return this.http.delete<Order>('http://localhost:8000/order/'+id)
  }


}