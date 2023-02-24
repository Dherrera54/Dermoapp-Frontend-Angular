import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InquiryService } from '../inquiry.service';
import { Inquiry } from '../inquiriy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inquiry-diagnose',
  templateUrl: './inquiry-diagnose.component.html',
  styleUrls: ['./inquiry-diagnose.component.scss']
})
export class InquiryDiagnoseComponent implements OnInit {

  inquiryId!:String;
  medicId!: String;
  token!: String;
  specialty!:String;
  origin!:String;
  inquiry!:Inquiry;
  diagnosticForm!: FormGroup;
  createDiagnosis:Boolean=false;
  
  
  

  constructor(private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private routerPath: Router,
              private toastr: ToastrService,
              private inquiryService: InquiryService) { }

  

  ngOnInit() {

    this.inquiryId = this.router.snapshot.params.inquiryId;
    this.medicId = this.router.snapshot.params.medicId;
    this.token = this.router.snapshot.params.userToken;
    this.specialty= this.router.snapshot.params.medicSpecialty;
    this.origin= this.router.snapshot.params.origin;
    this.getInquiryById()

    this.diagnosticForm=this.formBuilder.group({
      diagnosticDescription:["", [Validators.required, Validators.maxLength(500)]]
    })

  }
  getInquiryById():void{

    this.inquiryService.getInquiryById(this.inquiryId , this.token)
     .subscribe(res=> {
       this.inquiry=res;
     });

  }
  return(){
    if(this.origin==='inquiry-list'){
      this.routerPath.navigate([`/inquiries/${this.medicId}/${this.specialty}/${this.inquiryId}/${this.token}`]);
    }
    else{
      this.routerPath.navigate([`/inquiries/${this.medicId}/${this.specialty}/${this.inquiryId}/${this.token}/claimed`]);
    }
  }

}
