import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  isReset = false;
  errorMessage = '';
  currentUser: any;

  constructor(private token: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn)
    }
  }

  onSubmit() {
    this.userService.resetpass(this.model).subscribe(
      _data => {
        console.log(_data)
        this.isReset = true;
        this.token.signOut();
        this.isLoggedIn = false;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
