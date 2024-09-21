import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  constructor(private seller: SellerService, private router: Router) { }
  showdata = false;
  signUp(data: object) {
    this.seller.signUp(data);

  }

  login(data: object) {
    console.log(data)
  }

  ngOnInit() {
    this.seller.reaload()
  }

  showSignUp() {
    this.showdata = true
  }

  showLogin() {
    this.showdata = false
  }
}


