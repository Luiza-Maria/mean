import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { User } from '../../user-model';
import '../../../../assets/smtp.js';
import { Router } from '@angular/router';
declare let Email: any;

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  users;
  userExists: boolean = true;
  code: string = '';
  codePass = false;
  pass1;
  pass2;
  samePassword: boolean = false;
  userMatched: User[];

  constructor(private authServ: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.authServ.getUsers().subscribe(user => this.users = user);
  }

  onSubmit(f: NgForm) {
    console.log(f.value.email);
    this.userMatched = this.users.filter(user => user.email == f.value.email);
    if (this.userMatched.length > 0) {
      console.log("Email in DB: " + this.userMatched[0].email);
      this.code = this.userMatched[0].password.substr(this.userMatched[0].password.length - 5, this.userMatched[0].password.length - 1);
      console.log("Code:" + this.code);

      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'luizanicola32@gmail.com',
        Password: 'BFEC2DC193AFDD4E782E1F7375D55935056E',
        To: 'luizanicola32@gmail.com',
        From: 'luizanicola32@gmail.com',
        Subject: `Your code is: `,
        Body: `
        <i>${this.code}</i>`
      }).then(
        console.log("mail sent successfully")
      );
      this.userExists = false;
    }
    else {
      console.log("Email doesn't in DB");
    }
  }

  sendCode(codeVal) {
    if (this.code == codeVal) {
      this.codePass = true;
      this.userExists = true;
    };
  }

  newPass1(event:any) {
    this.pass1 = event.target.value;
  }

  newPass2(event: any) {
    this.pass2 = event.target.value;
    if (this.pass1 == this.pass2) {
      this.samePassword = true;
    }
  }

  sendPass(passNew) {
    const userMatchedEdit: User = {
      _id: this.userMatched[0]._id,
      email: this.userMatched[0].email,
      password: passNew
    }
    this.authServ.editUserPass(userMatchedEdit).subscribe(response => {
      console.log(response);
    });
    this.router.navigate(['./login']);
  }

}
