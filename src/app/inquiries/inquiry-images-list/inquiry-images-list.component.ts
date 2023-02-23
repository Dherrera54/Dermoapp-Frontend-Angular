import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InquiryService } from '../inquiry.service';

@Component({
  selector: 'app-inquiry-images-list',
  templateUrl: './inquiry-images-list.component.html',
  styleUrls: ['./inquiry-images-list.component.scss']
})
export class InquiryImagesListComponent implements OnInit {

  images!: String;
  inquiryId!:String;
  token!:String;
  specialty!:String;
  medicId!:String;

  constructor(
    private inquiryService: InquiryService,
    private router: ActivatedRoute,
    private routerPath: Router) { }

  ngOnInit() {

    this.inquiryId = this.router.snapshot.params.inquiryId
    this.medicId = this.router.snapshot.params.medicId
    this.token = this.router.snapshot.params.userToken
    this.specialty= this.router.snapshot.params.medicSpecialty
    this.getInquiriesById()

  }


  getInquiriesById():void{

     this.inquiryService.getInquiryById(this.inquiryId , this.token)
      .subscribe(res=> {
        this.images=res.image;
      });

   }
    return(){
       this.routerPath.navigate([`/inquiries/${this.medicId}/${this.specialty}/${this.inquiryId}/${this.token}`])

    }
}
