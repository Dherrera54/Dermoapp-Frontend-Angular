import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medic } from './medic';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MedicService {

  private backUrl: string = environment.URL_PRODUCTION
  constructor(private http: HttpClient) { }

  userLogIn(name: string, password: string):Observable<any>{
    return this.http.post<any>(`${this.backUrl}/logIn`, {"name": name, "password": password });
}
userSignUp(name: string,
           lastName: string,
           country: string,
           profesionalId: string,
           profilePicture: string,
           email: string,
           password: string,
           specialty: string,): Observable<any>{
  return this.http.post<any>(`${this.backUrl}/medics`, {"name": name, "password": password})
}

}
