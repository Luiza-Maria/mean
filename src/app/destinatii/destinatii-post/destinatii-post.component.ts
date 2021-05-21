import { NgLocaleLocalization } from '@angular/common';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { DestinatiiServService } from '../destinatii-serv.service';
import { Destinatie } from '../destinatii.model';


@Component({
  selector: 'app-destinatii-post',
  templateUrl: './destinatii-post.component.html',
  styleUrls: ['./destinatii-post.component.css']
})
export class DestinatiiPostComponent implements OnInit {
  private destinatie: Destinatie[] = [];
  cities;
  updateMode = false;
  cityToUpdate: Destinatie;
  nameCity = '';
  locationCity = '';
  updateBut = "Update";

  constructor( private destService: DestinatiiServService) { }

  ngOnInit(): void {
    // this.destService.getDestination().subscribe(city => this.cities = city);

  }

  // deleteCity(_id:string) {
  //   this.destService.deleteCity(_id).subscribe(() => {
  //     this.destService.getDestination().subscribe(city => this.cities = city);
      // const updatedPosts = this.cities.filter(city => city._id !== _id)
      // this.cities = updatedPosts;
     
  //   });
  // }

  // updateCity(event: Event, _id: string) {
  //   this.updateMode = true;
  //   this.cityToUpdate = this.cities.filter(city => city._id === _id); 
  //   this.nameCity = this.cityToUpdate[0].name;
  //   this.locationCity = this.cityToUpdate[0].localization;
  // }

  // onSave(name, image, location) {
  //   if (!this.updateMode) {
  //     const newDestination: Destinatie = {
  //       _id: null,
  //       name: name,
  //       image: image,
  //       localization: location
  //     };
  //     this.destService.postDestination(newDestination).subscribe(() => { this.destService.getDestination().subscribe(city => this.cities = city); });
  //     window.location.reload();
  //   }
   
  //   if (this.updateMode) {
  //     const destToUpdate: Destinatie = {
  //       _id: this.cityToUpdate[0]._id,
  //       name: name,
  //       image: image,
  //       localization: location    
  //     }
  //     this.destService.updateCity(destToUpdate._id, destToUpdate).subscribe(() => { this.destService.getDestination().subscribe(city => this.cities = city); });
  //   } 
  // }

}
