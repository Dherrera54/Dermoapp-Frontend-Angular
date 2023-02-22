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
  selected:Boolean= false;
  selectedInquiry!:Inquiry;
  specialty!:String;
  scrollAmount = 200;

  constructor(
    private router: ActivatedRoute,
    private medicService:MedicService,
    private toastr: ToastrService,

  ) {
      //Consuming service


  }

  ngOnInit() {
    this.medicId = this.router.snapshot.params.medicId;
    this.token = this.router.snapshot.params.userToken;
    this.specialty = this.router.snapshot.params.medicSpecialty;
    this.getInquiriesFromMedic();
  }
  scrollHorizontally( val: number) {
    const mediaScroller = this.mediaScrollerRef.nativeElement as HTMLElement;
    mediaScroller.scrollLeft += this.scrollAmount*val;
  }

  getInquiriesFromMedic():void{

    this.medicService.getMedicById(this.medicId, this.token)
    .subscribe(medic => {
      this.showInquiries = medic.inquiries });
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
  };
}
