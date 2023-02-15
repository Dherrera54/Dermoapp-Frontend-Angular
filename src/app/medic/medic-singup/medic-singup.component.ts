import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from "@angular/forms";
import { MedicService } from '../medic.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

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
  imgFiles:any=[];
  imgPrev!:String;
  strongPasswordRegex='(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

  constructor(
    private medicService:MedicService,
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer

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
      profilePicture:[""],
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

      this.uploadImg(this.medicForm.get('email')?.value)

      let token:string=res.token;
      let profilePicUrl:String="";
      this.showSuccess('Perfil de usuario creado con exito')

      //this.medicForm.get('profilePicture')?.value,

      if (this.medicForm.get('profesionalId')?.value!==""){
        this.medicService.imgUpload(this.medicForm.get('email')?.value+"_"+Date.now(),this.imgFiles[0])
      }

      this.medicService.medicCreate(
        this.medicForm.get('name')?.value,
        this.medicForm.get('lastName')?.value,
        this.medicForm.get('country')?.value,
        this.medicForm.get('profesionalId')?.value,
        profilePicUrl,
        this.medicForm.get('email')?.value,
        this.medicForm.get('password')?.value,
        this.medicForm.get('specialty')?.value
        )

      .subscribe(res => {
      console.log(res.id, res.specialty);

      this.routerPath.navigate([`/login`])
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
  catchFile(event:any):any{
    const capturedFile = event.target.files[0];

    let reader =new FileReader();
    reader.readAsDataURL(capturedFile);
    reader.onloadend=()=>{
      console.log(reader.result);
      this.imgFiles.push(reader.result);

    }

  }


  uploadImg(email:string):any{
    const dataForm= new FormData();
    this.imgFiles.forEach((file:any) =>{
      dataForm.append('files', file);
    })
    dataForm.append('email', email);

 /* this.medicService.post('https://us-central1-proyectogrupo-14.cloudfunctions.net/function-bucket-img-uploader',dataForm)
    .subscribe(res=>{
      console.log(res);}) */

  }

}
