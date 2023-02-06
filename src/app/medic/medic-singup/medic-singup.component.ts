import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from "@angular/forms";
import { MedicService } from '../medic.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-medic-singup',
  templateUrl: './medic-singup.component.html',
  styleUrls: ['./medic-singup.component.scss']
})
export class MedicSingupComponent implements OnInit {

  helper = new JwtHelperService();
  medicForm!: FormGroup;
  selected!: string;
  respLogin!: Observable<any>;
  strongPasswordRegex='(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';


  constructor(
    private medicService:MedicService,
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

   this.medicForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8),Validators.pattern(this.strongPasswordRegex)]],
      confirmPassword: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      country:["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      profesionalId: ["", [Validators.required, Validators.maxLength(10)]],
      profilePicture:["",[Validators.pattern(this.urlRegex)]],
      specialty: ["",Validators.required]

    },{
      validators:this.mustMatch('password','confirmPassword')
    })

  }
  userLogin(){

    return
  }
  registerMedic(){


    this.medicService.userSignUp(this.medicForm.get('email')?.value,
    this.medicForm.get('password')?.value,
    "Medico").subscribe(res=>{

      let token:string=res.token;
      this.showSuccess('Perfil de usuario creado con exito')
      this.medicService.medicCreate(
        this.medicForm.get('name')?.value,
        this.medicForm.get('lastName')?.value,
        this.medicForm.get('country')?.value,
        this.medicForm.get('profesionalId')?.value,
        this.medicForm.get('profilePicture')?.value,
        this.medicForm.get('email')?.value,
        this.medicForm.get('password')?.value,
        this.medicForm.get('specialty')?.value
        )

      .subscribe(res => {
      this.routerPath.navigate([`/inquiries/${res.id}/${token}`])
      this.showSuccess('Perfil de medico creado con exito')
      },
      error => {
        this.showError(`Ha ocurrido un error: ${error.message}`)
      });

    },
    (error: HttpErrorResponse) => {
      if(error.status==400){
        this.showError(`Ha ocurrido un error: Este correo ya se encuentra en uso`)
      }
      else{
        this.showError(`Ha ocurrido un error: ${error.message}`)
      }

      });
  }
  goLogIn() {
    this.routerPath.navigate([`/login/`]);
  }

  mustMatch(password:any, confirmPassword:any){
    return (formGroup:FormGroup)=>{

      const passwordControl=formGroup.controls[password]
      const confirmPasswordControl=formGroup.controls[confirmPassword]

      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
        return;
      }
      if( passwordControl.value!==confirmPasswordControl.value){
        confirmPasswordControl.setErrors({mustMach:true});
      }
      else{
        confirmPasswordControl.setErrors(null);
      }

    };
  }

  showError(error: string){
    this.toastr.error(error, "Error")
  }

  showSuccess(message:string) {
    this.toastr.success(message, "Registro exitoso");
  }

}
