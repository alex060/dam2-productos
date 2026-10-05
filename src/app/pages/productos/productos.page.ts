import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonChip
} from '@ionic/angular';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonBadge,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonChip
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private themeService = inject(ThemeService);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Modo de visualización: 'cards' (por defecto para el reto) o 'table'
  viewMode: 'cards' | 'table' = 'cards';

  // Control de paginación
  limit = 8;
  skip = 0;
  currentPage = 1;
  totalPages = 1;

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // KPIs del Dashboard
  get totalInventoryValue(): number {
    return this.products.reduce((acc, p) => acc + this.calculateStockValue(p), 0);
  }

  get averageDiscount(): number {
    if (!this.products.length) return 0;
    const totalDisc = this.products.reduce((acc, p) => acc + (p.discountPercentage || 0), 0);
    return totalDisc / this.products.length;
  }

  get totalUnits(): number {
    return this.products.reduce((acc, p) => acc + (p.stock || 0), 0);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.productService.getProducts(this.limit, this.skip)
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products = response.products;
          this.total = response.total;
          this.totalPages = Math.ceil(this.total / this.limit) || 1;
          this.currentPage = Math.floor(this.skip / this.limit) + 1;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
          this.error = 'No se han podido cargar los productos.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  nextPage(): void {
    if (this.skip + this.limit < this.total) {
      this.skip += this.limit;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.skip - this.limit >= 0) {
      this.skip -= this.limit;
      this.loadProducts();
    }
  }

  changeLimit(event: any): void {
    this.limit = Number(event.target.value);
    this.skip = 0;
    this.loadProducts();
  }

  calculateStockValue(product: Product): number {
    const totalGross = product.stock * product.price;
    const discount = product.discountPercentage ? (totalGross * (product.discountPercentage / 100)) : 0;
    return totalGross - discount;
  }
}
