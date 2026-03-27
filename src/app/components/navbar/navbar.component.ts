import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule, RouterLink],
  template: `
    <mat-toolbar color="primary" class="navbar elevation-z4">
      <a routerLink="/" class="brand">
        <mat-icon class="brand-icon">shopping_bag</mat-icon>
        <span>LuxeCart</span>
      </a>
      <span class="spacer"></span>
      <button mat-icon-button (click)="toggleCart.emit()" class="cart-btn" aria-label="Cart">
        <mat-icon [matBadge]="cartCount$ | async" matBadgeColor="accent" [matBadgeHidden]="(cartCount$ | async) === 0">shopping_cart</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      background: rgba(15, 23, 42, 0.9) !important;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 0 2rem;
    }
    .brand {
      text-decoration: none;
      color: #38bdf8;
      font-weight: 800;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      letter-spacing: -0.5px;
    }
    .brand-icon {
      font-size: 2rem;
      height: 2rem;
      width: 2rem;
    }
    .spacer { flex: 1; }
    .cart-btn {
      color: #f1f5f9;
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .cart-btn:hover {
      transform: scale(1.1);
      color: #38bdf8;
    }
  `]
})
export class NavbarComponent {
  @Output() toggleCart = new EventEmitter<void>();
  cartCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartCount$ = this.cartService.getCartCount();
  }
}
