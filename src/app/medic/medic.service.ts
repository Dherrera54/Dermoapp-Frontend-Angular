import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat';
import 'firebase/compat/storage';



@Injectable({
  providedIn: 'root'
})
export class MedicService {

  private defaul_profile_picture="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*"

  private backUrl: string = environment.URL_PRODUCTION
  constructor(private http: HttpClient) { }

  userLogIn(name: string, password: string):Observable<any>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');
    return this.http.post<any>(`${this.backUrl}/auth/login`, {"username": name, "password": password },{headers} );
}

userSignUp(email: string, password: string, roles:string):Observable<any>{
  const headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');
  return this.http.post<any>(`${this.backUrl}/users/signup`, {"email": email, "password": password, "roles":roles },{headers} );
}

medicCreate(name: String,
           lastName: String,
           country: String,
           profesionalId: String,
           profilePicture: String,
           email: String,
           password: String,
           specialty: String): Observable<any>{

  let headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');

  if(profilePicture== null ||profilePicture==""){
    profilePicture=this.defaul_profile_picture;
  }
  console.log(profilePicture);

  let body={"name": name,
            "lastName": lastName,
             "country": country,
             "profLicense": profesionalId,
             "profilePicture":profilePicture,
             "email":email,
             "password": password,
             "specialty":specialty}

  return  this.http.post<any>(`${this.backUrl}/medics`, body ,{headers} )

}
getUserByEmail(email: string, token: string):Observable<any>{
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');

  return this.http.get<any>(`${this.backUrl}/users/${email}`, {headers: headers} );
}

public imgUpload(email:string, imgBase64:any ){
  const headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', '*');
  //return this.http.post(url,body);
}

}
