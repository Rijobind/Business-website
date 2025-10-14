import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment/environment";

export interface ContactPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface CheckoutPalyload {
  checkoutlist_id: string;
  userId: string;
  product_id: string;
  seller_id: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  checkout_id: string;
  address: string;
  digital_key: string;
  url: string;
  isdigital: string;
  status: string;
}

export interface RegistrationPayload {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  username: string;
  password: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendapiService {
  apiUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient, private routes: Router) { }

  postContactDetails(payload: ContactPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/Contactus/contact`, payload);
  }

  getProductList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Product/productlist`);
  }

  getCountryList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Seller/currency_list`);
  }

  postAddressByUserId(userId: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customer/add_address/${userId}`, payload);
  }

  getAddressByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/customer/customer_list/${userId}`);
  }

  postEditedAddressByAddressId(addressId: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customer/update_address/${addressId}`, payload);
  }


  getOrderHistoryByUserId(userId: string) {
    return this.http.get(`${this.apiUrl}/checkout/getcheckout/${userId}`);
  }

  postLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/customer/login/${username}/${password}`, {});
  }

  postRegistration(payload: RegistrationPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/customer/create_customer`, payload);
  }

  postCheckout(payload: any) {
    return this.http.post(`${this.apiUrl}/checkout/checkout`, payload);
  }

  getProductById(product_id: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Product/product/${product_id}`);
  }

  getCustomerListById(userId: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/customer/customer_list/${userId}`);
  }

  getCheckoutDetailsById(checkoutId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/checkout/getcheckout-by-id/${checkoutId}`);
  }


  getProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Oonsoft/prodct_list_customer`);
  }

  postResetPassword(email: string): Observable<any> {
    let headers = new HttpHeaders({
      'accept': 'application/json'
    });

    return this.http.post(
      `${this.apiUrl}/customer/send_reset_password/${email}`,
      {},
      { headers }
    );
  }

  verifyPasswordToken(email: string, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'accept': 'application/json' });

    return this.http.post(
      `${this.apiUrl}/customer/verify/${email}/${token}`,
      {},
      { headers }
    );
  }

  resetPassword(token: string, email: string, password: string) {
    const headers = new HttpHeaders({ 'accept': 'application/json', });
    return this.http.post(
      `${this.apiUrl}/customer/reset_password/${token}/${email}/${password}`,
      {},
      { headers }
    );
  }

}
