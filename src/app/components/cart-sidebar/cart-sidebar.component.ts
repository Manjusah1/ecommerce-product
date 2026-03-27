import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <div class="cart-container">
      <div class="cart-header">
        <h2>Your Cart</h2>
        <button mat-icon-button (click)="closeCart.emit()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <div class="cart-content" *ngIf="(cartItems$ | async) as items">
        <div class="empty-state" *ngIf="items.length === 0">
          <mat-icon class="empty-icon">remove_shopping_cart</mat-icon>
          <p>Your cart is empty.</p>
        </div>

        <div class="cart-item" *ngFor="let item of items">
          <img [src]="item.image" [alt]="item.title" class="item-img" />
          <div class="item-details">
            <h4 class="item-title">{{ item.title }}</h4>
            <div class="item-price">{{ item.price | currency }}</div>
            <div class="qty-control">
              <button mat-icon-button class="qty-btn" (click)="updateQty(item.id, item.quantity - 1)">
                <mat-icon>remove</mat-icon>
              </button>
              <span class="qty-val">{{ item.quantity }}</span>
              <button mat-icon-button class="qty-btn" (click)="updateQty(item.id, item.quantity + 1)">
                <mat-icon>add</mat-icon>
              </button>
              <button mat-icon-button color="warn" class="del-btn" (click)="remove(item.id)">
                <mat-icon>delete_outline</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-footer">
        <mat-divider></mat-divider>
        <div class="total-row">
          <span>Total</span>
          <span class="total-price">{{ cartTotal$ | async | currency }}</span>
        </div>
        <button mat-flat-button color="primary" class="checkout-btn" [disabled]="(cartCount$ | async) === 0">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #1e293b;
      color: #f8fafc;
    }
    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      background: #0f172a;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .cart-header h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #e2e8f0;
    }
    .cart-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .empty-state {
      text-align: center;
      padding: 3rem 0;
      color: #64748b;
    }
    .empty-icon {
      font-size: 4rem;
      height: 4rem;
      width: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    .cart-item {
      display: flex;
      gap: 1rem;
      background: #334155;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .cart-item:hover {
      transform: translateY(-2px);
    }
    .item-img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }
    .item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .item-title {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #f1f5f9;
    }
    .item-price {
      color: #38bdf8;
      font-weight: 600;
      margin-bottom: auto;
    }
    .qty-control {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .qty-btn {
      width: 28px;
      height: 28px;
      padding: 0;
      background: #475569;
      border-radius: 4px;
      line-height: 28px;
    }
    .qty-btn .mat-icon { font-size: 18px; line-height: 18px; width: 18px; height: 18px; }
    .qty-val { font-weight: 600; min-width: 20px; text-align: center; }
    .del-btn { margin-left: auto; width: 32px; height: 32px; }
    .cart-footer {
      padding: 1.5rem;
      background: #0f172a;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 1rem 0;
      color: #e2e8f0;
    }
    .total-price { color: #38bdf8; }
    .checkout-btn { width: 100%; padding: 1rem; font-size: 1.1rem; font-weight: 600; border-radius: 8px; background: #38bdf8; color: #0f172a; }
  `]
})
export class CartSidebarComponent {
  @Output() closeCart = new EventEmitter<void>();
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  cartCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartTotal();
    this.cartCount$ = this.cartService.getCartCount();
  }

  updateQty(id: number, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }
}
