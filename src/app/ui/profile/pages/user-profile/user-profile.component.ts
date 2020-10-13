import { HttpClient } from '@angular/common/http';
import {Component, Inject, Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from 'src/app/core/globals';
import { User } from 'src/app/shared/data/users';

export interface DialogData {
  currentUser: User;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  @Input() formUserList: FormBuilder;
  
  imageUrl = "https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png"

  currentUser: User;

  roles = [0, 1];

  constructor(public dialog: MatDialog, private globals: Globals, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  chooseImage(){
   
  }

  openFile(){
    console.log('hell')
    document.querySelector('input').click()
  }

  getCurrentUser(): void {
    if (!sessionStorage.getItem('username')) {
      this.currentUser = new User;
      this.router.navigate(['/auth/login']);
      return;
    }
    this.getUserProfileData();
    console.log(this.currentUser);
  }

  private serverUrl = this.globals.serverUrl;
  private getProfileUrl = '/api/account/getprofiledata';
  private updateProfileUrl = '/api/account/updatecurrentuserprofiledata';

  getUserProfileData(): void{
    const token = sessionStorage.getItem('TestStoreToken');
    const url = this.serverUrl+this.getProfileUrl;

    this.http.get(url, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data: User) => {
      console.log(data);
      this.currentUser=data;
    },
      error=>{
        console.log(error);
      }
    );
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponentDialog, {
      width: '440px',
      data: {currentUser: this.currentUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result != null) {
        this.currentUser = result;
        this.saveUserChanges(this.currentUser);
      }
    });
   }

   saveUserChanges(user:User): void {
    const token = sessionStorage.getItem('TestStoreToken');

    this.http.post(this.serverUrl+this.updateProfileUrl, user, {headers: {
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

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile.component-dialog.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<UserProfileComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}