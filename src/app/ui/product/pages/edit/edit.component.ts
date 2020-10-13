import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Globals } from 'src/app/core/globals';
import { Product } from 'src/app/shared/data/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  id: number;
  product: Product;
  private serverUrl = this.globals.serverUrl;
  private getProductByIdUrl = '/api/store/getproductbyid';
  private updateProductUrl = '/api/store/updateproduct';

  private subscription: Subscription;
  constructor(private globals: Globals, private route: ActivatedRoute, public router: Router, private http: HttpClient){
    this.subscription = route.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
    this.getProductByIdAPI();
    this.allowAccess();
  }

  getProductByIdAPI(){
    const token = sessionStorage.getItem('TestStoreToken');
    const url = this.serverUrl+this.getProductByIdUrl;

    this.http.get(url+'?id='+this.id, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data: Product) => {
      console.log(data);
      this.product=data;  
    },
      error=>{
        console.log(error);
      }
    );
  }

  submitProductChanges(){
    const token = sessionStorage.getItem('TestStoreToken');

    this.http.post(this.serverUrl+this.updateProductUrl, this.product, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }})
    .subscribe(
      (data) => {
          console.log(data);
          this.router.navigate(['home','store']);
        },
      error=>{console.log(error);});
  }

  allowAccess(){
    if (!this.isAutorized()) {
      this.router.navigate(['auth','login']);
    }
  }

  isAutorized(): boolean{
    if (!sessionStorage.getItem('username')) {
      return false;
    }
    return true;
  }
}
