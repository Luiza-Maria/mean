import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private authServ: AuthServiceService) { }

  ngOnInit(): void {
    this.authServ.autoLogin(); 
  }


}
