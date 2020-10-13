import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/core/globals';
import { AccessToken } from 'src/app/shared/data/token';
import { User } from 'src/app/shared/data/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router, private http: HttpClient ) {
  }

  hide = true;
  
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('');
  lastName = new FormControl('');
  password = new FormControl('');
  
  ngOnInit(): void {
  }

  postValue: User;
  private serverUrl = 'http://localhost:49478';
  private registerUrl = '/api/account/register';

  onSubmitAPI(){
    this.postValue={email: this.email.value, firstName: this.firstName.value, lastName: this.lastName.value, password: this.password.value, role: 'user'};
    this.http.post(this.serverUrl+this.registerUrl, this.postValue)
    .subscribe((data:AccessToken) => {
        console.log(data);
        sessionStorage.setItem('TestStoreToken', data.access_token);
        sessionStorage.setItem('username', data.username);
        this.router.navigate(['/home/store']);
      });
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
