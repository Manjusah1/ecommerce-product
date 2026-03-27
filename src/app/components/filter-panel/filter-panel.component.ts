import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, MatSliderModule, MatCheckboxModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  template: `
    <mat-card class="filter-card">
      <div class="search-box">
        <mat-icon class="search-icon">search</mat-icon>
        <input type="text" placeholder="Search products..." [formControl]="searchControl">
      </div>

      <mat-accordion multi>
        <mat-expansion-panel expanded class="custom-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>Categories</mat-panel-title>
          </mat-expansion-panel-header>
          <div class="checkbox-group" [formGroup]="categoryForm">
            <mat-checkbox color="primary" formControlName="electronics">Electronics</mat-checkbox>
            <mat-checkbox color="primary" formControlName="furniture">Furniture</mat-checkbox>
            <mat-checkbox color="primary" formControlName="audio">Audio</mat-checkbox>
          </div>
        </mat-expansion-panel>

        <mat-expansion-panel expanded class="custom-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>Price Range</mat-panel-title>
          </mat-expansion-panel-header>
          <div class="price-slider">
            <mat-slider min="0" max="1000" step="10" discrete>
              <input value="0" matSliderStartThumb (input)="onPriceChange($event, 'min')">
              <input value="1000" matSliderEndThumb (input)="onPriceChange($event, 'max')">
            </mat-slider>
            <div class="price-labels">
              <span>{{ minPrice | currency }}</span>
              <span>{{ maxPrice | currency }}</span>
            </div>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </mat-card>
  `,
  styles: [`
    .filter-card {
      background: #1e293b;
      color: #f8fafc;
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .search-box {
      display: flex;
      align-items: center;
      background: #0f172a;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .search-icon { color: #64748b; margin-right: 0.5rem; }
    .search-box input {
      background: transparent;
      border: none;
      color: #f8fafc;
      font-size: 1rem;
      width: 100%;
      outline: none;
    }
    .custom-panel {
      background: #1e293b !important;
      color: #f8fafc !important;
      box-shadow: none !important;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .custom-panel ::ng-deep .mat-expansion-panel-header-title { color: #f8fafc; font-weight: 600; }
    .custom-panel ::ng-deep .mat-expansion-indicator::after { color: #94a3b8; }
    .checkbox-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .checkbox-group ::ng-deep .mdc-form-field { color: #cbd5e1; }
    .price-slider { padding: 1rem 0; }
    .price-labels { display: flex; justify-content: space-between; color: #94a3b8; font-size: 0.8rem; margin-top: 0.5rem; }
  `]
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  searchControl;
  categoryForm: FormGroup;
  minPrice = 0;
  maxPrice = 1000;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.searchControl = this.fb.control('');
    this.categoryForm = this.fb.group({
      electronics: [true],
      furniture: [true],
      audio: [true]
    });
  }

  ngOnInit() {
    // Step 7: Debounce Search input to update filters reactively
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(val => {
      this.productService.updateFilters({ search: val || '' });
    });

    // Sub to category changes
    this.categoryForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => {
      this.productService.updateFilters({ categories: val });
    });
  }
  
  onPriceChange(event: any, type: 'min'|'max') {
    const val = Number(event.target.value);
    if(type === 'min') this.minPrice = val;
    if(type === 'max') this.maxPrice = val;
    this.productService.updateFilters({ priceRange: { min: this.minPrice, max: this.maxPrice } });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
