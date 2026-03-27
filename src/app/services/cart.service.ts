import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() { }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(id: number): void {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== id);
    this.cartItems.next(updatedItems);
  }

  updateQuantity(id: number, qty: number): void {
    if (qty <= 0) {
      this.removeFromCart(id);
      return;
    }
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(i => i.id === id);
    if (item) {
      item.quantity = qty;
      this.cartItems.next([...currentItems]);
    }
  }

  getCartTotal(): Observable<number> {
    return new Observable(observer => {
      this.cartItems.subscribe(items => {
        const total = items.reduce((acc, current) => acc + (current.price * current.quantity), 0);
        observer.next(total);
      });
    });
  }

  getCartCount(): Observable<number> {
    return new Observable(observer => {
      this.cartItems.subscribe(items => {
        const count = items.reduce((acc, current) => acc + current.quantity, 0);
        observer.next(count);
      });
    });
  }
}
