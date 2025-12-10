import { Injectable } from '@angular/core';
import { Product } from './products';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'app_cart';
  private items: CartItem[] = [];

  constructor() {
    this.loadFromStorage();
  }
  getItems(): CartItem[] {
    return [...this.items];
  }     
  getTotalAmount(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.items.find(item => item.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
    } 
    this.saveToStorage();
}
updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;     
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }

      this.saveToStorage();
    }
  }
  removeFromCart(productId: number): void {
    this.items = this.items.filter(i => i.productId !== productId);
    this.saveToStorage();
  }

  clearCart(): void {


    this.items = [];
    this.saveToStorage();


  }
  private saveToStorage(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.items));
  }
  private loadFromStorage(): void {
    const json = localStorage.getItem(this.CART_KEY);
    if (!json) {
      this.items = [];
      return;
    }
    try {
      const data = JSON.parse(json) as CartItem[];
      if (Array.isArray(data)) {
        this.items = data;
      } else {
        this.items = [];
      }
    }
    catch {
      this.items = [];
    }
  }
}

