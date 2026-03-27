import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, MatButtonToggleModule, MatIconModule],
  template: `
    <div class="list-header">
      <h2>Featured Products</h2>
      <mat-button-toggle-group [(ngModel)]="viewMode" aria-label="View Mode" class="view-toggle">
        <mat-button-toggle value="grid"><mat-icon>grid_view</mat-icon></mat-button-toggle>
        <mat-button-toggle value="list"><mat-icon>view_list</mat-icon></mat-button-toggle>
      </mat-button-toggle-group>
    </div>

    <ng-container *ngIf="products$ | async as products; else loadingState">
      <div [class]="viewMode === 'grid' ? 'grid-view' : 'list-view'">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>
      
      <div class="empty-state" *ngIf="products.length === 0">
        <mat-icon>search_off</mat-icon>
        <p>No products found matching your criteria.</p>
      </div>
    </ng-container>

    <ng-template #loadingState>
      <div [class]="viewMode === 'grid' ? 'grid-view' : 'list-view'">
        <div class="skeleton-card" *ngFor="let i of skeletonArray">
          <div class="skeleton-img"></div>
          <div class="skeleton-content">
            <div class="skeleton-text category"></div>
            <div class="skeleton-text title"></div>
            <div class="skeleton-text price"></div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .list-header h2 { margin: 0; font-size: 1.8rem; font-weight: 700; color: #f8fafc; }
    .view-toggle { background: #1e293b; border: 1px solid rgba(255,255,255,0.1); }
    .view-toggle ::ng-deep .mat-button-toggle { color: #94a3b8; }
    .view-toggle ::ng-deep .mat-button-toggle-checked { background: #38bdf8; color: #0f172a; }

    .grid-view { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
    .list-view { display: flex; flex-direction: column; gap: 1.5rem; }
    .list-view ::ng-deep .product-card { display: flex; flex-direction: row; height: 200px; }
    .list-view ::ng-deep .image-container { width: 250px; height: 100%; }
    .empty-state { text-align: center; padding: 4rem 2rem; color: #64748b; }
    .empty-state mat-icon { font-size: 4rem; width: 4rem; height: 4rem; opacity: 0.5; margin-bottom: 1rem; }

    /* Skeleton Loader Styles */
    .skeleton-card {
      background: #1e293b;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.05);
      overflow: hidden;
    }
    .skeleton-img { width: 100%; height: 250px; background: #334155; animation: pulse 1.5s infinite; }
    .skeleton-content { padding: 1.5rem; }
    .skeleton-text { height: 1.25rem; background: #334155; border-radius: 4px; margin-bottom: 1rem; animation: pulse 1.5s infinite; }
    .skeleton-text.category { width: 30%; height: 1rem; }
    .skeleton-text.title { width: 80%; height: 1.5rem; }
    .skeleton-text.price { width: 40%; height: 2rem; margin-top: auto; }

    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 0.3; }
      100% { opacity: 0.7; }
    }
    
    .list-view .skeleton-card { display: flex; flex-direction: row; height: 200px; }
    .list-view .skeleton-img { width: 250px; height: 100%; margin: 0; border-radius: 0; }
  `]
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  viewMode: 'grid' | 'list' = 'grid';
  skeletonArray = Array(6).fill(0);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getFilteredProducts();
  }
}
