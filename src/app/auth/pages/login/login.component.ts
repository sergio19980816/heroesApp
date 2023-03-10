import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  constructor(private router: Router,
    private authservice : AuthService){}
  login(){
    this.authservice.login()
    .subscribe(auth => {
      console.log(auth)
      if(auth.id) this.router.navigate(["/heroe"]);
    });

  }
}
