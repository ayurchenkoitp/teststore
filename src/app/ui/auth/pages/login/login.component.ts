import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/core/globals';
import { AccessToken } from 'src/app/shared/data/token';
import { User, UserName } from 'src/app/shared/data/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  userId = -2;

  users: User[];

  private serverUrl = this.globals.serverUrl;
  private tokenUrl = '/token';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  postValue: UserName;

  constructor(private globals: Globals, public router: Router, private http: HttpClient,) {
  }
  
  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getUser(): void {
    this.postValue={username: this.email.value, password: this.password.value};
    this.http.post(this.serverUrl+this.tokenUrl, this.postValue, this.httpOptions)
    .subscribe(
      (data:AccessToken) => {
          console.log(data);
          sessionStorage.setItem('TestStoreToken', data.access_token);
          sessionStorage.setItem('username', data.username);
          this.router.navigate(['/home/store']);
        },
      error=>{this.userId=-1});
  }
    
  getData(url: string){
    const token = sessionStorage.getItem('TestStoreToken');
    
    this.http.get(url, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
  }}).subscribe(x => {console.log(x);})

    // const response = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //       "Accept": "application/json",
    //       "Authorization": "Bearer " + token  // передача токена в заголовке
    //   }
    // });
    // if (response.ok === true) {
        
    //     const data = await response.json();
    //     alert(data)
    // }
    // else
    //     console.log("Status: ", response.status); 
  }

  logout(){
    sessionStorage.removeItem('TestStoreToken');
    sessionStorage.removeItem('username');
  }
}
