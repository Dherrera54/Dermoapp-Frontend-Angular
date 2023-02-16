import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inquiry } from './inquiriy';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  private backUrl: string = environment.URL_PRODUCTION

constructor(private http: HttpClient) { }
getInquiriesBySpecialty(specialty: String, token: string): Observable<any[]>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.get<any[]>(`${this.backUrl}/consultations`, {headers: headers})
}

getInquiresFromMedicId(medicId: String, token: string): Observable<Inquiry[]>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.get<Inquiry[]>(`${this.backUrl}/inquiry/${medicId}}`, {headers: headers})
}
addInquirieToMedic(medicId: String, token: string, inquiryId:String): Observable<Inquiry>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');

  let body={"inquiryId": inquiryId}
  return this.http.post<Inquiry>(`${this.backUrl}/inquiry/${medicId}}`,body, {headers: headers})
}

}