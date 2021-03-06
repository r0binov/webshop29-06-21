import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: { product :Item, quantity: number } [] = [];
  cartChanged  = new Subject();

  constructor() { }

  getItemsFromCart() {
    return this.productsInCart.slice();
  }

  addToCart(item: Item): void {
    let cartItem = this.productsInCart.find(productInCart => productInCart.product.title == item.title);
    
    if(cartItem){
      cartItem.quantity++;
    } else {
      this.productsInCart.push({ product :item, quantity: 1 });
    }
  }

  emptyCart(): void {
    this.productsInCart = [];
  }

  deleteOneFromCart(item: { product :Item, quantity: number }) : void {
    let index = this.productsInCart.indexOf(item);
    if (index != -1) {
      if(this.productsInCart[index].quantity == 1){
        this.deleteItemFromCart(index);
      } else {
        this.productsInCart[index].quantity--;
      }
    } 
    console.log(index);
    
  }

  deleteItemFromCart(index: number): void {
    this.productsInCart.splice(index, 1);
  }


}
