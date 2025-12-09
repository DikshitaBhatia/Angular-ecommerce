import { Component, OnInit } from '@angular/core';
import { Product, Products } from '../../services/products';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports : [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit{
  products: Product[] = [];
  searchTerm: string = '';

  showForm = false;
  isEditing = false;

  formData: {
    id: number | null;
    name: string;
    category: string;   
    price: number;
    stock: number;    
  } = {
    id: null,
    name: '',
    category: '',
    price: 0,
    stock: 0
  };

  constructor(private productsService: Products) {}
  ngOnInit() {
    this.loadProducts();
  }
   get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.products;
    }
    return this.products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  loadProducts() {
    this.products = this.productsService.getProducts();
  }

  // Called when "Add New Product" button clicked
  onAddProduct() {
    this.isEditing = false;
    this.showForm = true;
    this.formData = {
      id: null,
      name: '',
      price: 0,
      category: '',
      stock: 0
    };
  }

  // Called when Edit button clicked
  onEditProduct(product: Product) {
    this.isEditing = true;
    this.showForm = true;
    this.formData = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock
    };
  }

  // Called when Delete button clicked
  onDeleteProduct(product: Product) {
    if (confirm(`Delete product "${product.name}"?`)) {
      this.productsService.deleteProduct(product.id);
      this.loadProducts();
    }
  }

  // Submit Add/Edit form
  onSubmitProductForm() {
    if (!this.formData.name || this.formData.price == null || this.formData.stock == null) {
      alert('Please fill required fields (name, price, stock).');
      return;
    }

    if (this.isEditing && this.formData.id != null) {
      // Update existing product
      const updated: Product = {
        id: this.formData.id,
        name: this.formData.name,
        price: this.formData.price,
        category: this.formData.category,
        stock: this.formData.stock
      };
      this.productsService.updateProduct(updated);
    } else {
      // Add new product
      this.productsService.addProduct({
        name: this.formData.name,
        price: this.formData.price,
        category: this.formData.category,
        stock: this.formData.stock
      });
    }

    this.showForm = false;
    this.loadProducts();
  }

  onCancelForm() {
    this.showForm = false;
  }
}
