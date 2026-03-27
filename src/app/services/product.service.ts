import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

export interface FilterState {
  search: string;
  categories: { [key: string]: boolean };
  priceRange: { min: number; max: number };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      title: 'Ergonomic Gaming Chair',
      description: 'A comfortable gaming chair with lumbar support.',
      price: 299.99,
      category: 'Furniture',
      rating: 4.8,
      image: 'https://via.placeholder.com/400x400?text=Gaming+Chair'
    },
    {
      id: 2,
      title: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with red switches.',
      price: 129.50,
      category: 'Electronics',
      rating: 4.5,
      image: 'https://via.placeholder.com/400x400?text=Mechanical+Keyboard'
    },
    {
      id: 3,
      title: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with fast response time.',
      price: 45.00,
      category: 'Electronics',
      rating: 4.2,
      image: 'https://via.placeholder.com/400x400?text=Wireless+Mouse'
    },
    {
      id: 4,
      title: 'Standing Desk',
      description: 'Adjustable standing desk with memory presets.',
      price: 450.00,
      category: 'Furniture',
      rating: 4.9,
      image: 'https://via.placeholder.com/400x400?text=Standing+Desk'
    },
    {
      id: 5,
      title: 'Noise Cancelling Headphones',
      description: 'Over-ear headphones with active noise cancelling.',
      price: 199.99,
      category: 'Audio',
      rating: 4.7,
      image: 'https://via.placeholder.com/400x400?text=Headphones'
    },
    {
      id: 6,
      title: 'Gaming Monitor',
      description: '27-inch 144Hz 1ms response time gaming monitor.',
      price: 320.00,
      category: 'Electronics',
      rating: 4.6,
      image: 'https://via.placeholder.com/400x400?text=Gaming+Monitor'
    }
  ];

  private filterSubject = new BehaviorSubject<FilterState>({
    search: '',
    categories: { electronics: true, furniture: true, audio: true },
    priceRange: { min: 0, max: 1000 }
  });

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(1000));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getFilteredProducts(): Observable<Product[]> {
    // Implement RxJS combineLatest as per Step 6 Task
    return combineLatest([
      this.getAllProducts(),
      this.filterSubject.asObservable()
    ]).pipe(
      map(([products, filters]) => {
        return products.filter(product => {
          // 1. Search Query Match
          const matchSearch = product.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                              product.description.toLowerCase().includes(filters.search.toLowerCase());
          
          // 2. Category Match
          const categoryKey = product.category.toLowerCase();
          const matchCategory = filters.categories[categoryKey] ?? true;

          // 3. Price Array Match
          const matchPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;

          return matchSearch && matchCategory && matchPrice;
        });
      })
    );
  }

  updateFilters(filters: Partial<FilterState>) {
    this.filterSubject.next({ ...this.filterSubject.getValue(), ...filters });
  }
}
