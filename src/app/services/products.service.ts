import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/products'; // Base URL for the products API

  constructor(private http: HttpClient) {}

  addProduct(data: object): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  productList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateProduct(data: object, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data); // Send PUT request to update product
  }
}
