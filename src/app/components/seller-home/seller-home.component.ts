import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SellerAddProductComponent } from '../seller-add-product/seller-add-product.component';

// Define the product interface
interface Product {
  id: number; // Adjust type based on your API response
  name: string;
  price: number;
  description: string;
  url: string;
}

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'] // Corrected to styleUrls
})
export class SellerHomeComponent {
  deletemessage: string | undefined;
  list: Product[] = []; // Initialize as an empty array
  successMessage: any;

  constructor(private product: ProductsService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productList();
  }

  productList() {
    this.product.productList().subscribe((result: Product[]) => { // Explicit type for result
      console.log(result);
      this.list = result; // Assign the result directly
    });
  }

  delete(id: number) { // Use a more specific type for id
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deletemessage = 'Product Deleted Successfully.';
        this.productList(); // Refresh the list after deletion
      }
      setTimeout(() => {
        this.deletemessage = undefined; // Clear the message after 3 seconds
      }, 2000);
    });
  }


  opendialog(item?: Product) { // Optional parameter for edit mode
    const dialogRef = this.dialog.open(SellerAddProductComponent, {
      data: item ? item : null // Pass item if editing, otherwise pass null for adding
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.successMessage = result; // 'Product Added/Updated Successfully'
        this.productList(); // Refresh the product list after adding or editing
      }
      setTimeout(() => {
        this.successMessage = undefined; // Clear the message after 3 seconds
      }, 2000);
    });
  }
  
  


}
