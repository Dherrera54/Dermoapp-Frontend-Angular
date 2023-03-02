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
/* updateStatusOnInquiry(inquiry:Inquiry,token:String, specialty:String):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  let body={"shape": inquiry.shape,
            "numberOfInjuries": inquiry.numberOfInjuries,
            "distribution": inquiry.distribution,
            "comment": inquiry.comment,
            "image": inquiry.image,
            "creationDate": inquiry.creationDate,
            "typeOfInjury": inquiry.typeOfInjury,
            "specialty": specialty,
            "assigned":true,
            "diagnosis": inquiry.diagnosis}

  return  this.http.put<any>(`${this.backUrl}/consultations/${inquiry.id}`, body ,{headers} )
} */

updateDiagnosisOnInquiry(inquiry:Inquiry, diagnosis:String,token:String, specialty:String):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
  let body={"shape": inquiry.shape,
            "numberOfInjuries": inquiry.numberOfInjuries,
            "distribution": inquiry.distribution,
            "comment": inquiry.comment,
            "image": inquiry.image,
            "creationDate": inquiry.creationDate,
            "typeOfInjury": inquiry.typeOfInjury,
            "specialty": specialty,
            "assigned":inquiry.assigned,
            "diagnosis": diagnosis}

  return  this.http.put<any>(`${this.backUrl}/consultations/${inquiry.id}`, body ,{headers} )
};

}
