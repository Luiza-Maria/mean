import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuservService } from '../menu/menuserv.service';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token: string;
  private tokenTimer: any;

  getToken() {
    return this.token;
  }
  expirationDate;
  
  userIsRegistered: boolean = false;
 
  private tokenUser = new BehaviorSubject<boolean>(null);
  
  constructor(private http: HttpClient, private router: Router) { }

  sendTokenState(userIsRegistered) {
    this.userIsRegistered = userIsRegistered;
    return this.tokenUser.next(this.userIsRegistered);
  }
  getTokenState() {
    return this.tokenUser.asObservable();
  }

  createUser(user:User): Observable<User> {
    return this.http.post<User>("http://localhost:3000/api/user/signup",user);
  }

  loginUser(user: User) {
    this.http.post<{ token: string; expiresIn: number }>("http://localhost:3000/api/user/login", user).subscribe(
      response => {
        this.token = response.token;
        console.log("Token from service:  " + this.token);

        if (this.token !== null) {
          const expires = response.expiresIn;
          console.log("Expires from service:  " + expires);
          this.setAuthTimer(expires);
          this.userIsRegistered = true;
          this.router.navigate(['./home']);
          const now = new Date();
          this.expirationDate = new Date(now.getTime() + expires*1000);
          this.saveAuthdata(this.token, this.expirationDate);
          console.log("Expiration" + this.expirationDate);
        }
      }
    )
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/api/user/us");
  }

  editUserPass(newUserPass):Observable<User[]> {
    return this.http.put<User[]>("http://localhost:3000/api/user/us",newUserPass);
  }

  logOut() {
    this.userIsRegistered = false;
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['./home']); 
  }

  autoLogin() {
    const authInfo = this.getAuthInfo();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expirationValid = authInfo.expiration.getTime() -  now.getTime();

    if (expirationValid> 0) {
      this.userIsRegistered = true;
      this.token = authInfo.token;
      this.setAuthTimer(expirationValid/1000);
    }
  }

  private setAuthTimer(duration) {
    console.log("duration: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000)
  }

  
  private saveAuthdata(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", this.expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthInfo() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if ( !token || !expirationDate ) {
      return;
    }

    return {
      token: token,
      expiration: new Date( expirationDate)
    }
  }
 
}
