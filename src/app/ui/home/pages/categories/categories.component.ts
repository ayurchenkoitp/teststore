import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/core/globals';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoies: string[]=[];
  private serverUrl = this.globals.serverUrl;
  private getCategoryUrl = '/api/store/getcategories';

  constructor(private globals: Globals, private http: HttpClient) { }

  ngOnInit() {
    this.getCategories();
  }
  
  getCategories(){
    const token = sessionStorage.getItem('TestStoreToken');
    const url = this.serverUrl+this.getCategoryUrl;

    this.http.get(url, {headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token  // передача токена в заголовке
    }}).subscribe((data: string[]) => {
      console.log(data);
      this.categoies=data;
    },
      error=>{
        console.log(error);
      }
    );
  }
}
