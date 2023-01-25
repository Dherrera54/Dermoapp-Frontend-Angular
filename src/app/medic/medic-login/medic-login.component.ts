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
    private router: Router
  ) { }


  ngOnInit() {
  }
  onLogInMedic(nombre: string, password: string){


    this.medicService.userLogIn(nombre, password)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      //this.router.navigate([`/consultas/${decodedToken.sub}/${res.token}`])*
    },
    )
  }


}
