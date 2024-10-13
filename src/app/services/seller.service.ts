import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SellerService {
  isLoggedIn = new BehaviorSubject<boolean>(false)
  error = new EventEmitter <boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: any) {
    this.http.post(`http://localhost:3000/seller`, data, { observe: 'response' }).subscribe(
      (result) => {
        if (result.body) {
          this.isLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          console.log('Data stored in localStorage:', JSON.stringify(result.body));

          this.router.navigate(['sellerhome']);
        } else {
          // Handle the case where the response body is empty
          console.error('No data received from signup API.');
        }
      },
      (error) => {
        console.error('Signup error:', error);
      }
    );
  }
  
  

  login(data: any) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe(
      (result:any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['sellerhome'])
        } else {
           this.error.emit(true)
        }
      })
  }

  reaload() {
    if (localStorage.getItem('seller')) {
      this.isLoggedIn.next(true);
      this.router.navigate(['sellerhome']);
    }
  }

}
