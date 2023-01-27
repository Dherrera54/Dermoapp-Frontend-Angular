import { Component, OnInit } from '@angular/core';
import { Medic } from '../medic';
import { MedicService } from '../medic.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-medic-login',
  templateUrl: './medic-login.component.html',
  styleUrls: ['./medic-login.component.scss']
})
export class MedicLoginComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(
    private medicService : MedicService,
    private routerPath: Router
  ) { }

  error: boolean = false

  ngOnInit() {
  }
  onLogInMedic(email: string, password: string){
    this.error = false

    this.medicService.userLogIn(email, password)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.routerPath.navigate([`/signin/${decodedToken.sub}/${res.token}`])
    },
    error => {
      this.error=true
    })
  }
  goRegister() {
    this.routerPath.navigate([`/singup/`])
  }
  goHome() {
    this.routerPath.navigate([`/`])
  }


}
