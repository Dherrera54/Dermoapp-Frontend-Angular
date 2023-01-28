import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicService } from '../../medic/medic.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.scss']
})
export class HeaderLoggedComponent implements OnInit {

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private medicService: MedicService
  ) { }

  ngOnInit() {
  }
  goTo(menu: string){
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken
    if(menu === "inquiries"){
      this.routerPath.navigate([`/inquiries/`])
    }
    else if(menu === "logOut"){
      this.routerPath.navigate([`/login/`])
    }
  }

}
