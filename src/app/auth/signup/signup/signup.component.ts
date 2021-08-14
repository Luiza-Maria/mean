import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authserv:AuthServiceService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(signUpF: NgForm) {
    if (signUpF.invalid) {
      return;
    }
    const newUser = {
      email: signUpF.value.email,
      password: signUpF.value.password
    }
    this.authserv.createUser(newUser).subscribe(response => {
      console.log(response);
    });
    console.log(signUpF.value);

  }

}
