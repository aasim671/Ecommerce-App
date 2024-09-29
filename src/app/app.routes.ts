import { Routes, RouterOutlet, RouterLink } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'seller',
    component: SellerAuthComponent
  },
  {
    path: 'sellerhome',
    component: SellerHomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [authGuard]
  }
];
