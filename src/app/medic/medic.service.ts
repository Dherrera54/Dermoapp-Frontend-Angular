import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import firebase from 'firebase/app';
import 'firebase/storage';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class MedicService {


  storageRef= firebase.storage().ref();

  public backUrl: string = environment.URL_PRODUCTION
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
getMedicByEmail(email: String, token: String):Observable<any>{
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');

  return this.http.get<any>(`${this.backUrl}/medics/email/${email}`, {headers: headers} );
}

getMedicById(id: String, token: String):Observable<any>{
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');

  return this.http.get<any>(`${this.backUrl}/medics/${id}`, {headers: headers} );
}

async imgUpload(imgname:String, imgBase64:any ){
  const headers = new HttpHeaders();
  headers.set('Content-Type', 'application/json');
  headers.set('Access-Control-Allow-Origin', 'https://dermoappfront.web.app/');

  try{
    let resp=await this.storageRef.child("medic/profilePics/"+imgname).putString(imgBase64, "data_url");
    return await resp.ref.getDownloadURL();

  }catch(err){
    console.log(err);
    return null;
  }
}

}
