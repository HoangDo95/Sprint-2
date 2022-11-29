import {Component, OnInit} from '@angular/core';
import {CartDetailService} from "../service/cart-detail.service";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {CartDetail} from "../model/cartDetail";
import {TokenStorageService} from "../service/token-storage.service";
import {History} from "../model/history";
import {Cart} from "../model/cart";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  history: History = {}
  cart: Cart = {
    cartDetailList: []
  }

  constructor(private cartDetailService: CartDetailService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private title: Title) {
    this.title.setTitle('Lịch sử mua hàng')
  }

  ngOnInit(): void {
    this.cartDetailService.getHistory(this.tokenStorageService.getUser().username).subscribe(value => {
      this.history = value;
      console.log(this.history);
    })
  }

  getTotalMoney(cart: Cart): number {
    let total = 0
    for (let i = 0; i < cart.cartDetailList.length; i++) {
      total += cart.cartDetailList[i].book.price * cart.cartDetailList[i].quantity;
    }
    return total + 10000;
  }

  showDetail(item: Cart) {
    this.cart = item;
  }
}
