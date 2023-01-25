import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Medic } from '../medic';


@Component({
  selector: 'app-medic-singup',
  templateUrl: './medic-singup.component.html',
  styleUrls: ['./medic-singup.component.scss']
})
export class MedicSingupComponent implements OnInit {

  //medicForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
   /*
   this.medicForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      pais:["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      direccion: ["", Validators.required, Validators.maxLength(50)],

    })
    */
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
