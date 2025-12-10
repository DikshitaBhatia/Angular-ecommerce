import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly PRODUCTS_KEY = 'app_products';
  private nextId = 5;

  private products: Product[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 10 },   
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 699.99, stock: 25 },
    { id: 3, name: 'Desk Chair', category: 'Furniture', price: 89.99, stock: 15 },
    { id: 4, name: 'Book: Angular Basics', category: 'Books', price: 29.99, stock: 50 },
  ];

   constructor() {
    this.loadFromStorage();
  }

  getProducts(): Product[] {
    return [...this.products];
  }
  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = { id: this.nextId++, ...product };
    this.products.push(newProduct);
    this.saveToStorage();
    return newProduct;
  }

  updateProduct(update:Product): void {
    const index = this.products.findIndex(p => p.id === update.id);
    if (index !== -1) {
      this.products[index] = update;
    }
    this.saveToStorage();
  }
  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToStorage();
  } 

  private saveToStorage(): void {
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify({
      products: this.products,
      nextId: this.nextId
    }));
  }

  private loadFromStorage(): void {
    const json = localStorage.getItem(this.PRODUCTS_KEY);
    if (!json) {
      // No saved data yet → use default sample products
      this.saveToStorage();
      return;
    }

    try {
      const data = JSON.parse(json) as { products: Product[]; nextId: number };
      if (Array.isArray(data.products)) {
        this.products = data.products;
      }
      if (typeof data.nextId === 'number') {
        this.nextId = data.nextId;
      } else {
        // fallback: compute nextId from max existing id
        const maxId = this.products.reduce((max, p) => Math.max(max, p.id), 0);
        this.nextId = maxId + 1;
      }
    } catch {
      // If parsing fails, fall back to defaults
      this.products = [
        { id: 1, name: 'Sample Product A', price: 499,  category: 'Category 1', stock: 10 },
        { id: 2, name: 'Sample Product B', price: 999,  category: 'Category 2', stock: 5  },
        { id: 3, name: 'Sample Product C', price: 1999, category: 'Category 3', stock: 2  }
      ];
      this.nextId = 4;
      this.saveToStorage();
    }
  }
}