import { Component } from '@angular/core';
import { DestinatiiServService } from './destinatii/destinatii-serv.service';
import { Destinatie } from './destinatii/destinatii.model';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthServiceService } from './auth/auth-service.service';
declare var $: any;

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
