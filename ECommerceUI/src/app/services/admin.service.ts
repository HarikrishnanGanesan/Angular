import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, Category} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'https://localhost:7149/api/Admin/';
  constructor(private http: HttpClient) { }

  getProducts(category: string, subcategory: string, count: number) {
    const url = `${this.baseUrl}/GetProducts?category=${category}&subcategory=${subcategory}&count=${count}`;
    return this.http.get<Product[]>(url);
  }

  addProduct(product: Product) {
    const url = `${this.baseUrl}/AddProduct`;
    return this.http.post<boolean>(url, product);
  }

  updateProduct(id: number, product: Product) {
    const url = `${this.baseUrl}/UpdateProduct/${id}`;
    return this.http.put<boolean>(url, product);
  }

  deleteProduct(id: number) {
    const url = `${this.baseUrl}/DeleteProduct/${id}`;
    return this.http.delete<boolean>(url);
  }

  getProductCategory(id: number) {
    const url = `${this.baseUrl}/GetProductCategory/${id}`;
    return this.http.get<Category>(url);
  }

  addCategory(category: Category) {
    const url = `${this.baseUrl}/AddCategory`;
    return this.http.post<boolean>(url, category);
  }

  updateCategory(id: number, category: Category) {
    const url = `${this.baseUrl}/UpdateCategory/${id}`;
    return this.http.put<boolean>(url, category);
  }

  deleteCategory(id: number) {
    const url = `${this.baseUrl}/DeleteCategory/${id}`;
    return this.http.delete<boolean>(url);
  }
}
