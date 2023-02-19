import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private backUrl: string = environment.URL_PRODUCTION
  constructor(private http: HttpClient) { }

  getPatientById(id:string, token:string): Observable<any>{
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');

  return this.http.get<any>(`${this.backUrl}/patients/${id}`, {headers: headers} );
  }

}
