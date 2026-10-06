import { Component, OnInit, inject, signal } from '@angular/core';
import { Product, ProductService, Order } from './services/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  orderMessage = signal('');

  editingProduct: Product | null = null;

  newProduct = {
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  newOrder: Order = {
    productId: 0,
    quantity: 1
  };

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  addProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe({
      next: (createdProduct) => {
        this.products.update(products => [
          ...products,
          createdProduct
        ]);

        this.newProduct = {
          name: '',
          description: '',
          price: 0,
          quantity: 0
        };
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update(products =>
          products.filter(product => product.id !== id)
        );
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }

  startEdit(product: Product): void {
    this.editingProduct = { ...product };
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  saveEdit(): void {
    if (!this.editingProduct) {
      return;
    }

    this.productService
      .updateProduct(this.editingProduct.id, this.editingProduct)
      .subscribe({
        next: (updatedProduct) => {
          this.products.update(products =>
            products.map(product =>
              product.id === updatedProduct.id
                ? updatedProduct
                : product
            )
          );

          this.editingProduct = null;
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
  }

  placeOrder(): void {
    this.productService.createOrder(this.newOrder).subscribe({
      next: () => {
        this.productService.getProducts().subscribe({
          next: (products) => {
            this.products.set(products);
            this.orderMessage.set('Order placed successfully!');
          },
          error: (error) => {
            console.error('Error refreshing products:', error);
          }
        });

        this.newOrder = {
          productId: 0,
          quantity: 1
        };
      },

      error: (error) => {
        if (error.status === 409) {
          this.orderMessage.set(
            'Not enough inventory for this order.'
          );
        } else if (error.status === 404) {
          this.orderMessage.set(
            'Please select a valid product.'
          );
        } else {
          this.orderMessage.set(
            'Something went wrong while creating the order.'
          );
        }

        console.error('Error creating order:', error);
      }
    });
  }
}