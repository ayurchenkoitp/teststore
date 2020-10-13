import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/core/globals';
import { User } from 'src/app/shared/data/users';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  @Input() formUserList: FormBuilder;
  users: User[];
  selectedUser:User;

  imageUrl = "https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png"

  currentUser: string;
  postValue: User;

  constructor(public dialog: MatDialog, private globals: Globals, private router: Router, private http: HttpClient) {
    this.getUsersAPI();
    
  }

  ngOnInit() {
  }

  private serverUrl = this.globals.serverUrl;
  private getProfileUrl = '/api/account/getfullprofiledata';

  getUsersAPI(): void{
    const token = sessionStorage.getItem('TestStoreToken');
    const url = this.serverUrl+this.getProfileUrl;

    this.http.get(url, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data: User[]) => {
      console.log(data);
      this.users=data;
      this.getCurrentUser();
    },
      error=>{
        console.log(error);
      }
    );
  } 

  openFile(){
    console.log('hell')
    document.querySelector('input').click()
  }

  getCurrentUser(): void {
    if (!sessionStorage.getItem('username')) {
      this.currentUser = "";
      this.router.navigate(['/auth/login']);
      return;
    }
    this.currentUser = sessionStorage.getItem('username');
    this.selectedUser=this.users[this.getUserId(this.currentUser)];
  }

  getSelectedUser(i:number): void{
    this.selectedUser=this.users[i];
    console.log(i);
    console.log(this.selectedUser);
  }

  getUserId(username:string): number{
    for (let i = 0; i < this.users.length; i++) {
      if (username===this.users[i].email) {
        return i;
      }
    }
    return -1;
  }

  private updateProfileUrl = '/api/account/updateprofiledata';

  saveUserChanges(): void {
    const token = sessionStorage.getItem('TestStoreToken');

    this.http.post(this.serverUrl+this.updateProfileUrl, this.selectedUser, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }})
    .subscribe(
      (data) => {
          console.log(data);
        },
      error=>{console.log(error);});
  }
}
