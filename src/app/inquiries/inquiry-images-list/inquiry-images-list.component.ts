import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { InquiryService } from '../inquiry.service';
import { InquiryMock } from 'src/app/shared/mocks/inquiry.mock';

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

  constructor(
    private inquiryService: InquiryService,
    private router: ActivatedRoute,
    private location:Location) { }

  ngOnInit() {

    this.inquiryId = this.router.snapshot.params.inquiryId
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
      this.location.back()

    }
}
