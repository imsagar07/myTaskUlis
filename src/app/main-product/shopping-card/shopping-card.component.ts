import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {
  shoppingCartData: any;
  totalQuantity: any;
  totalPrice: any;

  constructor() {}

  ngOnInit(): void {
    this.shoppingCartData = JSON.parse(<any>localStorage.getItem('cartData'));
    this.TotalQuantity();
    this.getTotalPrice();
  }

  //get Total Quantity of product
  TotalQuantity() {
    this.totalQuantity = this.shoppingCartData
      .map((prod: { quantity: any }) => prod.quantity)
      .reduce((a: any, b: any) => a + b, 0);
  }

  //get Total Price of product
  getTotalPrice() {
    this.totalPrice = this.shoppingCartData
      .map((prod: { price: any; quantity: any }) => prod.price * prod.quantity)
      .reduce((a: any, b: any) => a + b, 0);
  }

  //remove Product
  removeProduct(id: number) {
    let cValue = confirm('Do you want Remove Product From Cart List');
    if (cValue) {
      this.shoppingCartData = this.shoppingCartData.filter(
        (prod: { id: number }) => {
          return prod.id !== id;
        }
      );
      this.getTotalPrice();
      this.TotalQuantity();
      localStorage.setItem('cartData', JSON.stringify(this.shoppingCartData));
    }
  }

  //cart logic remove add product logic and put in local storage
  cartChangeValue(val: string, id: number) {
    if (val == '-') {
      for (let i = 0; i < this.shoppingCartData.length; i++) {
        if (id == this.shoppingCartData[i].id) {
          if (this.shoppingCartData[i].quantity == 1) {
            let cValue = confirm('Do you want Remove Product From Cart List');
            if (cValue) {
              this.shoppingCartData[i].quantity -= 1;
              this.shoppingCartData = this.shoppingCartData.filter(
                (prod: { quantity: number }) => {
                  return prod.quantity !== 0;
                }
              );
            }
          } else {
            this.shoppingCartData[i].quantity -= 1;
          }
        }
      }
    } else {
      for (let i = 0; i < this.shoppingCartData.length; i++) {
        if (id == this.shoppingCartData[i].id) {
          this.shoppingCartData[i].quantity += 1;
        }
      }
    }

    this.getTotalPrice();
    this.TotalQuantity();
    localStorage.setItem('cartData', JSON.stringify(this.shoppingCartData));
  }
}
