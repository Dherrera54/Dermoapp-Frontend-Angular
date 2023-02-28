import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {

  private backUrl: string = environment.URL_PRODUCTION

constructor(private http: HttpClient) { }
getInquiriesBySpecialty(specialty: String, token: String): Observable<any[]>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.get<any[]>(`${this.backUrl}/consultations/specialty/${specialty}`, {headers: headers})

}
getInquiryById(id: String, token: String): Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.get<any>(`${this.backUrl}/consultations/${id}`, {headers: headers})

}

updateDiagnosisOnInquiry(id:String, diagnosis:String,token:String):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  let body={"diagnosis": diagnosis}

  return  this.http.put<any>(`${this.backUrl}/consultations/${id}`, body ,{headers} )
}
/* getInquiresFromMedicId(medicId: String, token: String): Observable<Inquiry[]>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  return this.http.get<Inquiry[]>(`${this.backUrl}/inquiry/${medicId}}`, {headers: headers})
}
 */

}
