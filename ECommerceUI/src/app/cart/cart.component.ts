// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Cart, Payment } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  usersCart: Cart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  usersPaymentInfo: Payment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: Cart[] = [];

  constructor(
    public utilityService: UtilityService,
    private http: HttpClient,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData(): void {
    // Get Cart
    this.navigationService.getActiveCartOfUser(this.utilityService.getUser().id).subscribe((res: any) => {
      this.usersCart = res;

      // Calculate Payment
      this.utilityService.calculatePayment(this.usersCart, this.usersPaymentInfo);
    });

    // Get Previous Carts
    this.navigationService.getAllPreviousCarts(this.utilityService.getUser().id).subscribe((res: any) => {
      this.usersPreviousCarts = res;
    });
  }

  removeItemFromCart(item: CartItem): void {
    const index = this.usersCart.cartItems.findIndex((cartItem: CartItem) => cartItem.product.id === item.product.id);
    if (index > -1) {
      this.usersCart.cartItems.splice(index, 1);
      this.updateCart();
    }
  }

  updateCartItemQuantity(cartItem: CartItem, action: 'increment' | 'decrement'): void {
    if (action === 'increment') {
      cartItem.quantity++;
    } else if (action === 'decrement' && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      // If quantity becomes 0 or below, remove the item from the cart
      this.removeItemFromCart(cartItem);
      return; // No need to update the cart item quantity
    }

    const userId = this.utilityService.getUser().id;
    const productId = cartItem.product.id;
    const quantity = cartItem.quantity;

    this.navigationService.updateCartItemQuantity(userId, productId, quantity)
      .subscribe(
        (res: any) => {
          // Handle successful update if needed
          this.updateCart();
        },
        (error: any) => {
          // Handle error if needed
        }
      );
  }

  updateCart(): void {
    // Calculate Payment
    this.utilityService.calculatePayment(this.usersCart, this.usersPaymentInfo);
  }
}
