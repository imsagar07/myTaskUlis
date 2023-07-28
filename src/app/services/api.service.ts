import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private REST_API_SERVER = 'https://fakestoreapi.com';

  // apiServiceUrl: string = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.REST_API_SERVER+'/products');
  }
  getProductDetails(id:number) {
    return this.http.get(this.REST_API_SERVER+'/products/'+id);
  }
}


