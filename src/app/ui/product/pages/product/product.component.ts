import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Globals } from 'src/app/core/globals';
import { Product } from 'src/app/shared/data/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: number;
  product: Product;
  private serverUrl = this.globals.serverUrl;
  private getProductByIdUrl = '/api/store/getproductbyid';

  private subscription: Subscription;
  constructor(private route: ActivatedRoute, private globals: Globals, private http: HttpClient){
    this.subscription = route.params.subscribe(params=>this.id=params['id']);
  }
  
  ngOnInit() {
    this.getProductByIdAPI();
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

  isAutorized(): boolean{
    if (!sessionStorage.getItem('username')) {
      return false;
    }
    return true;
  }
  
}
