import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
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
    IonCardContent,
    IonButton
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.cdr.detectChanges();

    this.productService.getProducts()
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products = response.products;
          this.total = response.total;
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

  calculateStockValue(product: Product): number {
    const totalGross = product.stock * product.price;
    const discount = product.discountPercentage ? (totalGross * (product.discountPercentage / 100)) : 0;
    return totalGross - discount;
  }
}
