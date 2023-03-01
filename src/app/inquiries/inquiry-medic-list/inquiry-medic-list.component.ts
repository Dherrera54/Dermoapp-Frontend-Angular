import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicService } from '../../medic/medic.service';
import { Inquiry } from '../inquiriy';

@Component({
  selector: 'app-inquiry-medic-list',
  templateUrl: './inquiry-medic-list.component.html',
  styleUrls: ['./inquiry-medic-list.component.scss']
})
export class InquiryMedicListComponent implements OnInit {

  @ViewChild('mediaScroller') mediaScrollerRef!: ElementRef;

  medicId!: String;
  token!: String;
  showInquiries:Array<Inquiry>=[];
  inquiry!:Inquiry;
  selected:Boolean= false;
  selectedInquiry!:Inquiry;
  specialty!:String;
  inquiryId!:String;
  origin:String="inquiry-medic-list";
  scrollAmount = 200;

  constructor(
    private router: ActivatedRoute,
    private medicService:MedicService,
    private toastr: ToastrService,

  ) {



  }

  ngOnInit() {
    this.medicId = this.router.snapshot.params.medicId;
    this.token = this.router.snapshot.params.userToken;
    this.specialty = this.router.snapshot.params.medicSpecialty;
    this.inquiryId = this.router.snapshot.params.inquiryId;
    this.getInquiriesFromMedic();
  }
  scrollHorizontally( val: number) {
    const mediaScroller = this.mediaScrollerRef.nativeElement as HTMLElement;
    mediaScroller.scrollLeft += this.scrollAmount*val;
  }

  getInquiriesFromMedic():void{
    this.medicService.getMedicInquiriesById(this.medicId, this.token)
    .subscribe(res => {
      this.showInquiries = res

      if(this.inquiryId){
        for(let i=0;i<this.showInquiries.length;i++){
          if(this.showInquiries[i].id==this.inquiryId){
            this.onSelectedInquiry(this.showInquiries[i]);
          };
        };
      };
    });

/*       this.showInquiries=MedicMock.response.data.inquiries;

      if(this.inquiryId){
        for(let i=0;i<this.showInquiries.length;i++){
          if(this.showInquiries[i].id==this.inquiryId){
            this.onSelectedInquiry(this.showInquiries[i]);
          };
        };
      }; */
  };

  showError(error: string){
    this.toastr.error(error, "Error");
  };
  calculateAge(birthDate:string){
    let timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age;

  };
  onSelectedInquiry(inquiry: Inquiry):void{
    this.selected=true;
    this.selectedInquiry=inquiry;
    this.inquiry=this.selectedInquiry;
  };

  onCancel(cancel:Boolean){
    this.selected=cancel;
  };
}
