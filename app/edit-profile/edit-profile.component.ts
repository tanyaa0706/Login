import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
//import { Router } from '@angular/router';
import { UserModel } from '../_class/user-model';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  model:UserModel;
  isLoggedIn = false;
  updateButtonSubmit: boolean;
  isSuccessful: boolean;
  isUpdateFailed: boolean;
  errorMessage = '';

  constructor(private token: TokenStorageService, private authService: AuthService, private userService: UserService, private router: Router) {
    this.model = new UserModel;
   }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
    }
    this.userService.getUserDetails().subscribe(
      data => {
        this.model = data;
      },
      err => {
        this.model = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit() {
    this.updateButtonSubmit=true;
    if(this.model!=null){
    this.authService.edituser(this.model).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
    }
  }

}
