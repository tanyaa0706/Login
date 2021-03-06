//This service provides methods to access public and protected resources.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'test/all', { responseType: 'text' });
  }

  getCustomerContent(): Observable<any> {
    return this.http.get(API_URL + 'test/customer', { responseType: 'text' });
  }

  getAdminContent(): Observable<any> {
    return this.http.get(API_URL + 'test/admin', { responseType: 'text' });
  }

  getUserDetails(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'json' })
  }
  resetpass(credentials): Observable<any> {
    return this.http.post(API_URL + 'user/change-password', {
      oldPassword: credentials.oldPassword,
      newPassword: credentials.newPassword
    }, httpOptions);
  }
}
