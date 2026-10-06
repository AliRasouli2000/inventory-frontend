import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: number;
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private ordersApiUrl = 'http://localhost:8080/api/orders';

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersApiUrl, order);
  }

}