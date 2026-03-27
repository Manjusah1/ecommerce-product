import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule, RouterLink],
  template: `
    <div class="detail-container" *ngIf="product$ | async as product; else loadingOrError">
      <button mat-button class="back-btn" (click)="goBack()">
        <mat-icon>arrow_back</mat-icon> Back to Home
      </button>

      <div class="product-grid">
        <div class="image-section">
          <div class="image-zoom-container">
            <img [src]="product.image" [alt]="product.title" class="main-image">
          </div>
        </div>

        <div class="info-section">
          <mat-chip-set aria-label="Product Category">
            <mat-chip class="category-chip">{{ product.category }}</mat-chip>
          </mat-chip-set>
          
          <h1 class="title">{{ product.title }}</h1>
          
          <div class="rating-row">
            <div class="stars">
              <mat-icon>star</mat-icon>
              <span>{{ product.rating }} Rating</span>
            </div>
          </div>
          
          <div class="price">{{ product.price | currency }}</div>
          
          <p class="description">{{ product.description }}</p>

          <div class="actions">
            <button mat-flat-button color="primary" class="add-to-cart-btn" (click)="addToCart(product)">
              <mat-icon>shopping_cart</mat-icon> Add to Cart
            </button>
          </div>
          
          <div class="shipping-info">
            <div class="info-item">
              <mat-icon>local_shipping</mat-icon>
              <span>Free Setup & Shipping</span>
            </div>
            <div class="info-item">
              <mat-icon>verified_user</mat-icon>
              <span>2 Years Warranty</span>
            </div>
            <div class="info-item">
              <mat-icon>assignment_return</mat-icon>
              <span>30 Days Return Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ng-template #loadingOrError>
      <div class="product-grid skeleton-container">
        <div class="skeleton-image"></div>
        <div class="info-section">
          <div class="skeleton-chip"></div>
          <div class="skeleton-title"></div>
          <div class="skeleton-rating"></div>
          <div class="skeleton-price"></div>
          <div class="skeleton-desc"></div>
          <div class="skeleton-desc"></div>
          <div class="skeleton-desc short"></div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .back-btn { margin-bottom: 2rem; color: #94a3b8; font-weight: 500; }
    .back-btn:hover { color: #f8fafc; }
    
    .product-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: start;
    }
    
    .image-zoom-container {
      border-radius: 20px;
      overflow: hidden;
      background: #1e293b;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(255,255,255,0.05);
      cursor: zoom-in;
    }
    .main-image {
      width: 100%;
      height: auto;
      max-width: 500px;
      object-fit: contain;
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .image-zoom-container:hover .main-image { transform: scale(1.3); }

    .info-section { color: #f8fafc; display: flex; flex-direction: column; }
    .category-chip { background: #334155; color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; }
    
    .title { font-size: 3rem; font-weight: 800; line-height: 1.2; margin: 0 0 1rem 0; letter-spacing: -1px; }
    .rating-row { display: flex; align-items: center; margin-bottom: 1.5rem; }
    .stars { display: flex; align-items: center; gap: 0.5rem; color: #fbbf24; font-weight: 600; font-size: 1.1rem; }
    
    .price { font-size: 2.5rem; font-weight: 800; color: #38bdf8; margin-bottom: 2rem; }
    .description { font-size: 1.2rem; line-height: 1.8; color: #94a3b8; margin-bottom: 2.5rem; }
    
    .actions { display: flex; gap: 1rem; margin-bottom: 3rem; }
    .add-to-cart-btn { padding: 1.5rem 3rem; font-size: 1.2rem; font-weight: 700; border-radius: 12px; background: #38bdf8; color: #0f172a; height: auto; transition: transform 0.2s; }
    .add-to-cart-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(56, 189, 248, 0.4); }
    
    .shipping-info { display: flex; flex-direction: column; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; }
    .info-item { display: flex; align-items: center; gap: 1rem; color: #cbd5e1; font-size: 1.1rem; }
    .info-item mat-icon { color: #38bdf8; }

    /* Skeleton Styles */
    .skeleton-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .skeleton-image { height: 500px; border-radius: 20px; background: #334155; animation: pulse 1.5s infinite; }
    .skeleton-chip { height: 32px; width: 100px; border-radius: 16px; background: #334155; margin-bottom: 1rem; animation: pulse 1.5s infinite; }
    .skeleton-title { height: 3.5rem; width: 80%; border-radius: 8px; background: #334155; margin-bottom: 1rem; animation: pulse 1.5s infinite; }
    .skeleton-rating { height: 2rem; width: 40%; border-radius: 4px; background: #334155; margin-bottom: 1.5rem; animation: pulse 1.5s infinite; }
    .skeleton-price { height: 3rem; width: 20%; border-radius: 8px; background: #334155; margin-bottom: 2rem; animation: pulse 1.5s infinite; }
    .skeleton-desc { height: 1.5rem; width: 100%; border-radius: 4px; background: #334155; margin-bottom: 0.5rem; animation: pulse 1.5s infinite; }
    .skeleton-desc.short { width: 60%; margin-bottom: 2.5rem; }
    
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 0.3; }
      100% { opacity: 0.7; }
    }

    @media (max-width: 1024px) {
      .product-grid { grid-template-columns: 1fr; gap: 2rem; }
      .title { font-size: 2.5rem; }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
  ) {}

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.productService.getProductById(id);
      })
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  goBack() {
    this.location.back();
  }
}
