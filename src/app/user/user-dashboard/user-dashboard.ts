import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService,AppUser } from '../../shared/auth';
import { Product, ProductService } from '../../services/products';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit {

  currentUser: AppUser | null = null;
  products: Product[] = [];
  searchTerm = '';
  cartItemsCount = 0;

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.products = this.productService.getProducts();
  }
  onAddToCart(product: Product) {
    this.cartService.addToCart(product, 1);
    this.cartItemsCount = this.cartService.getItems().length;
    alert(`Added "${product.name}" to cart.`);
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.products;

    return this.products.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
