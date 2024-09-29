import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  message: string | undefined
  constructor(private product: ProductsService) { }

  adddata(data: object) :void {
     this.product.addProduct(data).subscribe((result:any) => {
      if (result) {
        this.message = 'Product Added Sucessfully.';
      }
      setTimeout(() => {

        this.message = undefined;

      }, 3000);
    });
  }
}
