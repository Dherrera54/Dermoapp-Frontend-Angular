import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicService } from '../../medic/medic.service';
import { TranslateService } from '@ngx-translate/core';



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
    public translate: TranslateService
  ) { }

  ngOnInit() {
  }
  goTo(menu: string){
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken
    if(menu === "logIn"){
      this.routerPath.navigate([`/login/`])
    }
    else if(menu === "singUp"){
      this.routerPath.navigate([`/singup/`])
    }
  }

}
