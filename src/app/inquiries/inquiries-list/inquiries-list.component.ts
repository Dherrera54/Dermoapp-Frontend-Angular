import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inquiry } from '../inquiriy';
import { InquiryService } from '../inquiry.service';
import { InquiryMock } from 'src/app/shared/mocks/inquiry.mock';



@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.component.html',
  styleUrls: ['./inquiries-list.component.scss']
})
export class InquiriesListComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private inquiryService:InquiryService,
    private toastr: ToastrService,

  ) { }
  medicId!: String;
  token!: String;
  showInquiries!:Array<any>;
  selected:Boolean= false;
  selectedInquiry!:Inquiry;
  inquiry!:Inquiry;
  specialty!:String;
  medic!:any;

  ngOnInit() {
    //testing mock
    this.medicId = this.router.snapshot.params.medicId
      this.token = this.router.snapshot.params.userToken
      this.specialty = this.router.snapshot.params.medicSpecialty
      this.getInquiriesBySpecialty();

    //Consuming service
   /*  if(!this.router.snapshot.params.medicId || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.medicId = this.router.snapshot.params.medicId;
      this.token = this.router.snapshot.params.userToken;
      this.specialty = this.router.snapshot.params.medicSpecialty;
      this.getInquiriesBySpecialty();


    } */
  }


  getInquiriesBySpecialty():void{

  /*   this.inquiryService.getInquiriesBySpecialty(this.specialty, this.token)
    .subscribe(inquiries => {
      this.showInquiries = inquiries

    })
 */

    //testing mock

    this.showInquiries= InquiryMock.response.data;
    console.log(this.showInquiries);


  }

  onSelectedInquiry(inquiry: Inquiry):void{
    this.selected=true;
    this.selectedInquiry=inquiry;
    this.inquiry=this.selectedInquiry;

  }
  onCancel(cancel:Boolean){
    this.selected=cancel;
  }


  showError(error: string){
    this.toastr.error(error, "Error");
  }
  calculateAge(birthDate:string){
    let timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age;

  }

}
