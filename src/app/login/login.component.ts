import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';  // used for backtrack routing
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""; //user
  password = ""; //password
  validLogin = false;

  constructor(private location: Location, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  previousView(){
    this.location.back();
  }

  login(): void{
    this.loginService.checkLogin(this.username, this.password).subscribe(result => {
          this.validLogin = result;
          if(this.validLogin == false){
            //alert fallimento
          }
          else{
            //mostra alert successo
          }
          console.log("Login: " + result);
    });
    //The flow continues after checkLogin -> asynchronous operatin using subscribe
    console.log('After get');
  }
}
