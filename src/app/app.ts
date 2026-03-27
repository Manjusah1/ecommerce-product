import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CartSidebarComponent, MatSidenavModule],
  template: `
    <app-navbar (toggleCart)="cartDrawer.toggle()"></app-navbar>
    <mat-sidenav-container class="app-container">
      <mat-sidenav #cartDrawer position="end" mode="over" class="cart-sidenav">
        <app-cart-sidebar (closeCart)="cartDrawer.close()"></app-cart-sidebar>
      </mat-sidenav>
      <mat-sidenav-content class="main-content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: #0f172a;
      color: #f1f5f9;
      font-family: 'Inter', Roboto, sans-serif;
    }
    .app-container {
      flex: 1;
      background: transparent;
    }
    .main-content {
      padding: 0;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      min-height: calc(100vh - 64px);
    }
    .cart-sidenav {
      width: 400px;
      max-width: 100vw;
      background-color: #1e293b;
      color: white;
    }
  `]
})
export class App {}
