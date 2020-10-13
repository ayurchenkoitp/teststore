import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/core/globals';
import { Product } from 'src/app/shared/data/product';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products: Product[];
  private serverUrl = this.globals.serverUrl;
  private getProductUrl = '/api/store/getproducts';

  constructor(private globals: Globals, private http: HttpClient) {
  }
  
  ngOnInit() {
    this.getProductAPI();
  }

  getProductAPI(){
    const token = sessionStorage.getItem('TestStoreToken');
    const url = this.serverUrl+this.getProductUrl;

    this.http.get(url, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data: Product[]) => {
      console.log(data);
      this.products=data;
    },
      error=>{
        console.log(error);
      }
    );
  }
}
