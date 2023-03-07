import { Component,  OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inquiry } from '../inquiriy';
import { InquiryService } from '../inquiry.service';
import { InquiryDetailComponent } from '../inquiry-detail/inquiry-detail.component';
import { MedicService } from '../../medic/medic.service';

@Component({
  selector: 'app-inquiries-list',
  templateUrl: './inquiries-list.component.html',
  styleUrls: ['./inquiries-list.component.scss']
})


export class InquiriesListComponent implements OnInit{

  @ViewChild('mediaScroller') mediaScrollerRef!: ElementRef;
  @ViewChild(InquiryDetailComponent) inquiryDetailComponent!: InquiryDetailComponent;


  constructor(
    private router: ActivatedRoute,
    private inquiryService:InquiryService,
    private medicService: MedicService,
    private toastr: ToastrService,
  ) { }
  medicId!: String;
  token!: String;
  showInquiries:Array<Inquiry>=[];
  medicInquiries:Array<Inquiry>=[];
  selected:Boolean= false;
  selectedInquiry!:Inquiry;
  inquiry!:Inquiry;
  specialty!:String;
  medic!:any;
  inquiryId!:String;
  origin:String="inquiry-list";
  scrollAmount = 200;


  ngOnInit() {

      //Consuming service
     if(!this.router.snapshot.params.medicId || this.router.snapshot.params.userToken === " "){
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else{
      this.medicId = this.router.snapshot.params.medicId;
      this.token = this.router.snapshot.params.userToken;
      this.specialty = this.router.snapshot.params.medicSpecialty;
      this.inquiryId = this.router.snapshot.params.inquiryId;
      this.getInquiriesBySpecialty();




    }

   }

  scrollHorizontally( val: number) {
    const mediaScroller = this.mediaScrollerRef.nativeElement as HTMLElement;
    mediaScroller.scrollLeft += this.scrollAmount*val;
  }

  getInquiriesBySpecialty():void{

    this.inquiryService.getInquiriesBySpecialty(this.specialty, this.token)
    .subscribe(inquiries => {
      this.showInquiries = inquiries
      this.medicService.getMedicInquiriesById(this.medicId, this.token).subscribe(res=>{
        this.medicInquiries=res;

        for(let i=0;i<this.showInquiries.length;i++){
          for(let j=0;j<this.medicInquiries.length; j++){
          if(this.showInquiries[i].id==this.medicInquiries[j].id){
            this.showInquiries[i].owned=true;
            break
          }
          else{
            this.showInquiries[i].owned=false;
          };
        }
        };


      })

      if(this.inquiryId){
        for(let i=0;i<inquiries.length;i++){
          if(inquiries[i].id==this.inquiryId){
            this.onSelectedInquiry(inquiries[i]);
          };
        };


      };

    });
  }

  onSelectedInquiry(inquiry: Inquiry):void{
    if(this.selected)
    {
      this.inquiryDetailComponent.reinitialize();
    }
    this.selected=true;
    this.selectedInquiry=inquiry;
    this.inquiry=this.selectedInquiry;

  }
  onCancel(cancel:Boolean){
    this.selected=cancel;
  }
  onClaimedInquiry(claimed:Boolean){
    this.getInquiriesBySpecialty();

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
