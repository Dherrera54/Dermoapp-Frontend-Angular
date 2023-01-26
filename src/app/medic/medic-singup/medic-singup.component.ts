import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Medic } from '../medic';
import { MedicService } from '../medic.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-medic-singup',
  templateUrl: './medic-singup.component.html',
  styleUrls: ['./medic-singup.component.scss']
})
export class MedicSingupComponent implements OnInit {

  helper = new JwtHelperService();
  medicForm!: FormGroup;

  constructor(
    private MedicService:MedicService,
    private formBuilder: FormBuilder,
    private routerPath: Router,

  ) { }

  ngOnInit() {

   this.medicForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      country:["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      address: ["", Validators.required, Validators.maxLength(50)],
      profesionalId: ["", [Validators.required, Validators.maxLength(10)]],

    })

  }
  registerMedic(){
    /*this.usuarioService.medicSignUp(this.medicForm.get('nombre')?.value, this.medicForm.get('password')?.value)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.router.navigate([`/albumes/${decodedToken.sub}/${res.token}`])
      this.showSuccess()
    },
    error => {
      this.showError(`Ha ocurrido un error: ${error.message}`)
    })*/
  }

}
