import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InquiryMock } from '../../shared/mocks/inquiry.mock';
import { Inquiry } from '../inquiriy';
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
    private toastr: ToastrService
  ) { }
  medicId!: number;
  token!: string;
  showInquiries!:Array<any>;//Array<Inquiries>;
  selected:Boolean= false;
  selectedInquiry!:Inquiry;
  inquiry:any;

  ngOnInit() {
    this.medicId = parseInt(this.router.snapshot.params.medicId)
      this.token = this.router.snapshot.params.userToken
      this.getInquiries();
    if(!parseInt(this.router.snapshot.params.medicId) || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.medicId = parseInt(this.router.snapshot.params.medicId)
      this.token = this.router.snapshot.params.userToken
      this.getInquiries();

    }
  }
  getInquiries():void{
    /*
    this.inquiryService.getCancionesPorUsuario(this.medicId, this.token)
    .subscribe(inquiries => {
      this.inquiries = inquiries
      this.inquiries = inquiries
    })
    */
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
    this.toastr.error(error, "{{'AuthErr'|translate}}");
  }

}
