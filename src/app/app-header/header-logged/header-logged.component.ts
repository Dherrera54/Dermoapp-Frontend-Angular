import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicService } from '../../medic/medic.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss']
})
export class HeaderLoggedComponent implements OnInit {

  medicImgUrl!:String;
  medicId!: String;
  specialty!:String;
  token!: String;

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private medicService: MedicService

  ) { }

  ngOnInit() {
    this.medicId = this.router.snapshot.params.medicId;
    this.token = this.router.snapshot.params.userToken;
    this.specialty = this.router.snapshot.params.medicSpecialty;
    this.medicService.getMedicById(this.medicId,this.token).subscribe(res=>{
        this.medicImgUrl=res.profilePicture;
        this.specialty=res.specialty;
    });
  }
  goTo(menu: string){
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken
    if(menu === "inquiries"){
      this.routerPath.navigate([`/inquiries/${this.medicId}/${this.specialty}/inquiryId/${this.token}`])
    }
    else if(menu === "patients"){
      this.routerPath.navigate([`/inquiries/${this.medicId}/${this.specialty}/inquiryId/${this.token}/claimed`])
    }
    else if(menu === "logOut"){
      this.routerPath.navigate([`/login/`])
    }
  }


}
