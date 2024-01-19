import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  Category,
  Order,
  Payment,
  PaymentMethod,
  User,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  baseurl = 'https://localhost:7149/api/Shopping/';
  adminurl = 'https://localhost:7149/api/Admin/';

  constructor(private http: HttpClient) {}

  //admin
  addCategory(category: string, subcategory: string) {
    const body = { category, subcategory };
    return this.http.post(this.adminurl + 'AddCategory', body);
  }

  updateCategory(id: number, category: string, subcategory: string) {
    const body = { id, category, subcategory };
    return this.http.put(this.adminurl + `UpdateCategory/${id}`, body);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.adminurl + `DeleteCategory/${id}`);
  }

  addProduct(product: string) {
    return this.http.post(this.adminurl + 'AddProduct', product);
  }

  updateProduct(id: number, product: string) {
    return this.http.put(this.adminurl + `UpdateProduct/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.adminurl + `DeleteProduct/${id}`);
  }


  //user
  getCategoryList() {
    let url = this.baseurl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }

  getProducts(category: string, subcategory: string, count: number) {
    return this.http.get<any[]>(this.baseurl + 'GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('subcategory', subcategory)
        .set('count', count),
    });
  }

  getProduct(id: number) {
    let url = this.baseurl + 'GetProduct/' + id;
    return this.http.get(url);
  }

  registerUser(user: User) {
    let url = this.baseurl + 'RegisterUser';
    return this.http.post(url, user, { responseType: 'text' });
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl + 'LoginUser';
    return this.http.post(
      url,
      { Email: email, Password: password },
      { responseType: 'text' }
    );
  }

  submitReview(userid: number, productid: number, review: string) {
    let obj: any = {
      User: {
        Id: userid,
      },
      Product: {
        Id: productid,
      },
      Value: review,
    };

    let url = this.baseurl + 'InsertReview';
    return this.http.post(url, obj, { responseType: 'text' });
  }

  getAllReviewsOfProduct(productId: number) {
    let url = this.baseurl + 'GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userid: number, productid: number) {
    let url = this.baseurl + 'InsertCartItem/' + userid + '/' + productid;
    return this.http.post(url, null, { responseType: 'text' });
  }

  updateCartItemQuantity(userId: number, productId: number, quantity: number){
    let url = this.baseurl + 'UpdateCartItemQuantity/' + userId +'/'+ productId +'/'+ quantity;
    return this.http.put(url, null);
  }

  removeFromCart(userid: number, productid: number) {
    let url = this.baseurl + 'RemoveCartItem/' + userid + '/' + productid;
    return this.http.delete(url);
  }

  getActiveCartOfUser(userid: number) {
    let url = this.baseurl + 'GetActiveCartOfUser/' + userid;
    return this.http.get(url);
  }

  getAllPreviousCarts(userid: number) {
    let url = this.baseurl + 'GetAllPreviousCartsOfUser/' + userid;
    return this.http.get(url);
  }

  getPaymentMethods() {
    let url = this.baseurl + 'GetPaymentMethods';
    return this.http.get<PaymentMethod[]>(url);
  }

  insertPayment(payment: Payment) {
    return this.http.post(this.baseurl + 'InsertPayment', payment, {
      responseType: 'text',
    });
  }

  insertOrder(order: Order) {
    return this.http.post(this.baseurl + 'InsertOrder', order);
  }
}
