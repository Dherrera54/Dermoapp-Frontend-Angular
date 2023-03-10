import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicService } from '../../medic/medic.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private medicService: MedicService,
      ) { }

  ngOnInit() {
  }
  goTo(menu: string){

    if(menu === "logIn"){
      this.routerPath.navigate([`/login/`])
    }
    else if(menu === "singUp"){
      this.routerPath.navigate([`/singup/`])
    }
  }

}
