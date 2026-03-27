import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, FilterPanelComponent],
  template: `
    <div class="home-layout">
      <aside class="sidebar">
        <app-filter-panel></app-filter-panel>
      </aside>
      <main class="content">
        <div class="hero">
          <h1>Discover Premium Gear</h1>
          <p>Upgrade your setup with the best equipment in the market.</p>
        </div>
        <app-product-list></app-product-list>
      </main>
    </div>
  `,
  styles: [`
    .home-layout {
      display: flex;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    .sidebar {
      width: 300px;
      flex-shrink: 0;
    }
    .content {
      flex: 1;
    }
    .hero {
      margin-bottom: 2rem;
      padding: 3rem;
      background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
      border-radius: 16px;
      color: white;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    .hero h1 {
      margin: 0 0 1rem 0;
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -1px;
    }
    .hero p {
      margin: 0;
      font-size: 1.25rem;
      opacity: 0.9;
    }

    @media (max-width: 1024px) {
      .home-layout { flex-direction: column; padding: 1rem; }
      .sidebar { width: 100%; }
      .hero { padding: 2rem; }
    }
  `]
})
export class HomeComponent {}
