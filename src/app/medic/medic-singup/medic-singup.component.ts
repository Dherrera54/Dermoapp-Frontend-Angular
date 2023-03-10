import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from "@angular/forms";
import { MedicService } from '../medic.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Country }  from 'country-state-city';
import { ICountry } from 'country-state-city'
@Component({
  selector: 'app-medic-singup',
  templateUrl: './medic-singup.component.html',
  styleUrls: ['./medic-singup.component.scss']
})
export class MedicSingupComponent implements OnInit {


  medicForm!: FormGroup;
  selectedSpecialty!: string;
  selectedCountry!: string;
  respLogin!: Observable<any>;
  imgFiles:any=[];
  strongPasswordRegex='(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
  profilePicUrl!:String;
  selectedFileName!:String;
  private default_profile_picture="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*"
  countries!:ICountry[];


  constructor(
    private medicService:MedicService,
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,


   ) { }

  ngOnInit() {

    this.countries=Country.getAllCountries();
   this.medicForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(8),Validators.pattern(this.strongPasswordRegex)]],
      confirmPassword: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      country:["", [Validators.required]],
      profesionalId: ["", [Validators.required, Validators.maxLength(10)]],
      profilePicture:[""],
      specialty: ["",Validators.required]

    },{
      validators:this.mustMatch('password','confirmPassword')
    })

  }

  registerMedic(){


    this.medicService.userSignUp(this.medicForm.get('email')?.value,
    this.medicForm.get('password')?.value,
    "Medico").subscribe(res=>{


      this.showSuccess('Perfil de usuario creado con exito')

      if (this.medicForm.get('profilePicture')?.value!=""){

        this.medicService.imgUpload(this.medicForm.get('profilePicture')?.value+"_"+Date.now(),this.imgFiles[0]).then( urlImg =>{
          this.profilePicUrl=urlImg;
          this.createMedic();

      });
        }
      else
      {
       this.profilePicUrl=this.default_profile_picture;
       this.createMedic();
      }
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
  catchFile(event:any):any{
    const capturedFile = event.target.files[0];

    let reader =new FileReader();
    reader.readAsDataURL(capturedFile);
    reader.onloadend=()=>{
      this.imgFiles[0]=reader.result;

    }
    if(event.target.files.length > 0)
      {
        this.selectedFileName = event.target.files[0].name;
      }

  }
   createMedic(){
    this.medicService.medicCreate(
      this.medicForm.get('name')?.value,
      this.medicForm.get('lastName')?.value,
      this.medicForm.get('country')?.value,
      this.medicForm.get('profesionalId')?.value,
      this.profilePicUrl,
      this.medicForm.get('email')?.value,
      this.medicForm.get('password')?.value,
      this.medicForm.get('specialty')?.value
      )

    .subscribe(res => {
    this.routerPath.navigate([`/login`])
    this.showSuccess('Perfil de medico creado con exito')
    },
    error => {
      this.showError(`Ha ocurrido un error: ${error.message}`)
    });
   }
  
}
