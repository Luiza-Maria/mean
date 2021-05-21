import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { MenuservService } from '../../../menu/menuserv.service'
  ;
import { User } from '../../user-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private token: string;
  userIsRegistered: boolean = false;

  constructor(public authserv: AuthServiceService ,public menuServ: MenuservService, public router:Router) { }

  ngOnInit(): void {

  }
  onSubmit(loginF: NgForm) {
    if (loginF.invalid) {
      return;
    }
    const newUser = {
      email: loginF.value.email,
      password: loginF.value.password
    }
    this.authserv.loginUser(newUser);
  }

}
