import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Inquiry } from '../inquiriy';

@Component({
  selector: 'app-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss']
})
export class InquiryDetailComponent implements OnInit {

  @Input() selectedInquiry!:Inquiry;
  @Output() cancelOutput = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  };
  cancel(){
    this.cancelOutput.emit(false)
  };
  claim(){};


}
