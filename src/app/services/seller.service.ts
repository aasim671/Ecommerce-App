import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SellerService {
  isLoggedIn = new BehaviorSubject<boolean>(false)

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

  reaload() {
    if (localStorage.getItem('seller')) {
      this.isLoggedIn.next(true);
      this.router.navigate(['sellerhome'])
    }
  }




}
