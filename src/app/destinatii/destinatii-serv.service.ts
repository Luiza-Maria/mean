import { Injectable } from '@angular/core';
import { Destinatie } from './destinatii.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinatiiServService {
 

  constructor(private http: HttpClient) { }
  
  // getDestination(): Observable<Destinatie[]> {
  //   return this.http.get<Destinatie[]>('http://localhost:3000/api/destinatii');
    
  // }

  // postDestination(destination:Destinatie): Observable<Destinatie> {
  //   return this.http.post<Destinatie>('http://localhost:3000/api/destinatii',destination);
    
  // }

  // deleteCity(id:string): Observable<Destinatie>{
  //   return this.http.delete<Destinatie>('http://localhost:3000/api/destinatii/' + id);

  // }

  // updateCity(id: string, newCityUpdated): Observable<Destinatie>{
  //   console.log(newCityUpdated);
  //   return this.http.put<Destinatie>('http://localhost:3000/api/destinatii/' + id, newCityUpdated);
  

  // }
}
