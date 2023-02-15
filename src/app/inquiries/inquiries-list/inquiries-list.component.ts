import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InquiryMock } from '../../shared/mocks/inquiry.mock';
import { Inquiry } from '../inquiriy';
import { InquiryService } from '../inquiry.service';
//mock for development



@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.component.html',
  styleUrls: ['./inquiries-list.component.scss']
})
export class InquiriesListComponent implements OnInit {

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private inquiryService:InquiryService,
    private toastr: ToastrService
  ) { }
  medicId!: number;
  token!: string;
  showInquiries!:Array<Inquiry>;
  selected:Boolean= false;
  selectedInquiry!:Inquiry;
  inquiry!:Inquiry;
  @Input() specialty!:String;

  ngOnInit() {
    //testing mock
    this.medicId = this.router.snapshot.params.medicId
      this.token = this.router.snapshot.params.userToken
      this.specialty = this.router.snapshot.params.medicSpecialty
      this.getInquiriesBySpecialty();

    //Consuming service
    if(!parseInt(this.router.snapshot.params.medicId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.medicId = parseInt(this.router.snapshot.params.medicId)
      this.token = this.router.snapshot.params.userToken
      this.specialty = this.router.snapshot.params.medicSpecialty
      this.getInquiriesBySpecialty();

    }
  }
  getInquiriesBySpecialty():void{

    this.inquiryService.getInquiriesBySpecialty(this.specialty, this.token)
    .subscribe(inquiries => {
      this.showInquiries = inquiries

    })


    //testing mock
  /*
    this.showInquiries= InquiryMock.response.data;
    console.log(this.showInquiries);
  */

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

}
