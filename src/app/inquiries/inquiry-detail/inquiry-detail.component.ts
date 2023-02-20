import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Inquiry } from '../inquiriy';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicService } from '../../medic/medic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss']
})
export class InquiryDetailComponent implements OnInit {

  @Input() selectedInquiry!:Inquiry;
  @Output() cancelOutput = new EventEmitter<Boolean>();
  imgUrl!:String;
  token!: String;
  medicId!:String;
  specialty!:String;

  constructor(private router: Router,
              private routerPath: ActivatedRoute,
              private medicService:MedicService,
              private toastr: ToastrService,) { }

  ngOnInit() {
    this.token = this.routerPath.snapshot.params.userToken
    this.medicId= this.routerPath.snapshot.params.medicId
    this.specialty= this.routerPath.snapshot.params.medicSpecialty




  };

  calculateAge(birthDate:string){
    let timeDiff = Math.abs(Date.now() - new Date(birthDate).getTime());
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age;

  }

  cancel(){
    this.cancelOutput.emit(false)
  };
  claim(){
    this.medicService.addInquiryToMedic(this.medicId, this.token, this.selectedInquiry.id).subscribe(res =>{

      this.showSuccess('Se ha añadido la consulta a tu listado de pacientes')
    },
    error => {
      this.showError(`Error: ${error.message}`)

    });

  };

  seeImages(imgUrl:String, id:String){
    this.imgUrl=imgUrl;
    this.router.navigate([`/inquiries/${this.medicId}/${this.specialty}/${id}/images/${this.token}`])

  };

  showError(error: string){
    this.toastr.error(error, "Error!")
  }

  showSuccess(message:string) {
    this.toastr.success(message, "Success!");
  }


}
