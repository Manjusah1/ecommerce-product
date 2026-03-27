import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  inputs: ['product'],
  template: `
    <mat-card class="product-card" (click)="viewDetails()">
      <div class="image-container">
        <img mat-card-image [src]="product.image" [alt]="product.title">
        <div class="overlay">
          <button mat-fab color="accent" class="add-btn" (click)="addToCart($event)">
            <mat-icon>add_shopping_cart</mat-icon>
          </button>
        </div>
      </div>
      <mat-card-content class="content">
        <div class="category">{{ product.category }}</div>
        <h3 class="title">{{ product.title }}</h3>
        <div class="rating">
          <mat-icon class="star">star</mat-icon>
          <span>{{ product.rating }}</span>
        </div>
        <div class="price">{{ product.price | currency }}</div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .product-card {
      background: #1e293b;
      color: #f1f5f9;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .image-container {
      position: relative;
      overflow: hidden;
      height: 250px;
    }
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .product-card:hover .image-container img {
      transform: scale(1.05);
    }
    .overlay {
      position: absolute;
      bottom: -60px;
      right: 16px;
      transition: bottom 0.3s ease;
    }
    .product-card:hover .overlay {
      bottom: 16px;
    }
    .add-btn { background-color: #38bdf8; color: #0f172a; }
    .content { padding: 1.5rem; text-align: left; }
    .category { font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
    .title { font-size: 1.25rem; font-weight: 700; margin: 0 0 1rem 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #e2e8f0; }
    .rating { display: flex; align-items: center; gap: 0.25rem; color: #fbbf24; margin-bottom: 1rem; font-weight: 600; }
    .star { font-size: 1.25rem; height: 1.25rem; width: 1.25rem; }
    .price { font-size: 1.5rem; font-weight: 800; color: #38bdf8; }
  `]
})
export class ProductCardComponent {
  product!: Product;

  constructor(private cartService: CartService, private router: Router) {}

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }

  viewDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}
