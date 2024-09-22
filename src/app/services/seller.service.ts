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
    return this.http.post(`http://localhost:3000/seller`, data, { observe: 'response' }).subscribe(
      (result) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['sellerhome'])
      }
    )

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
      this.router.navigate(['sellerhome'])
    }
  }

}
