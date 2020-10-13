import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/core/globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: string;
  userRole: string;
  private serverUrl = this.globals.serverUrl;
  private getUserRoleUrl = '/api/account/getrole';

  constructor(private globals: Globals, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCurrentUserAPI();
  }

  logout(): void{
    this.currentUser=null;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('TestStoreToken');
  }

  getCurrentUserAPI(): void {
    this.currentUser = sessionStorage.getItem('username');
    this.getUserRole();
  }

  getUserRole(): void{
    const token = sessionStorage.getItem('TestStoreToken');
    if (token === null) {
      this.userRole="undefinedUser";
    }

    this.http.get(this.serverUrl+this.getUserRoleUrl, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }})
    .subscribe(
      (data: string) => {
          console.log(data);
          this.userRole=data;
        },
      error=>{console.log(error); this.userRole="undefinedUser";});
      this.userRole="undefinedUser";
  }
}
