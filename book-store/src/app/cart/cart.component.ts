import {Component, OnInit} from '@angular/core';
import {CartDetail} from "../model/cartDetail";
import {CartDetailService} from "../service/cart-detail.service";
import {Book} from "../model/book";
import {CartService} from "../service/cart.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {render} from "creditcardpayments/creditCardPayments";
import {TokenStorageService} from "../service/token-storage.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetail: CartDetail[] = [];
  totalCart = 0;
  money = 10000;

  carts: any = [];


  constructor(private cartService: CartService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private cartDetailService: CartDetailService,
              private title: Title) {
    this.title.setTitle('Giỏ hàng')
    // render(
    //   {
    //     id: "#myPaypalButtons",
    //     currency:"USD",
    //     value:"100.00",
    //     onApprove: (details) =>{
    //       alert("Transaction Successfull")
    //     }
    //   }
    // )

  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser()) {
      this.cartDetailService.getCart(this.tokenStorageService.getUser().username).subscribe(value => {
        this.cartDetail = value;
        localStorage.setItem('cart', JSON.stringify(this.cartDetail));
        this.resultTotal();
      });
    }
  }

  getAll() {
    this.cartDetail = JSON.parse(localStorage.getItem('cart'));
    if (this.cartDetail === null) {
      this.cartDetail = [];
    }
    this.resultTotal();
  }

  decCard(item: Book) {
    this.cartService.addCard(item, -1);
    this.getAll();
  }

  incCard(item: Book) {
    this.cartService.addCard(item, 1);
    this.getAll();
  }

  resultTotal() {
    let temp = 0;
    if (this.cartDetail === null || this.cartDetail.length === 0) {
      temp = 0;
    } else {
      for (const item of this.cartDetail) {
        temp += item.book.price * item.quantity;
      }
    }
    this.totalCart = temp;
  }

  payment() {
    document.getElementById('paypal').innerHTML = '<div id="btnPayPal"></div>';
    const username = this.tokenStorageService.getUser().username;
    render({
      id: '#paypal',
      currency: 'USD',
      value: String((this.totalCart / 23000).toFixed(2)),
      onApprove: (details) => {
        this.cartDetailService.saveCartDetail(username, this.cartDetail).subscribe(() => {
            this.cartDetailService.saveCart(username, []).subscribe();
          });
        Swal.fire({
          title: 'Thanh Toán Thành Công',
          // text: 'Sách Của Bạn Sẽ Được Giao Trong Vòng 3 Ngày Tới',
          icon: 'success',
          iconColor: 'success',
        });
        this.cartDetail = [];
        localStorage.setItem('cart', JSON.stringify(this.cartDetail));
        document.getElementById('close').click();

      }
    });

  }


  deleteCart(id: number) {
    for (const card of this.cartDetail) {
      if (card.book.id === id) {
        Swal.fire({
          title: 'Thông Báo !',
          text: 'Bạn Muốn Xoá Sản Phẩm Này Khỏi Giỏ Hàng ?!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đồng Ý'
        }).then((result: any) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Thông Báo !',
              'Đã Xoá Sản Phẩm Khỏi Giỏ Hàng.',
              'success'
            );
            this.cartDetail.splice(this.cartDetail.indexOf(card), 1);
            localStorage.setItem('cart', JSON.stringify(this.cartDetail));
            this.cartDetailService.saveCart(this.tokenStorageService.getUser().username, this.cartDetail).subscribe(value => {
              return;
            })
          }
        });

      }
    }
  }

}
