import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {Category} from "../../model/category";
import {BookService} from "../../service/book.service";
import {CategoryService} from "../../service/category.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {CartService} from "../../service/cart.service";
import Swal from "sweetalert2";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books: Book[] = [];
  categories: Category[] = [];
  temp: Book = {};
  id: number;
  number = 1;

  // phan quyen
  username: string;
  idPatient: number;
  currentUser: string;
  role: string;
  isLoggedIn = false;

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private title: Title,
              private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,) {
    this.title.setTitle('Chi Tiết Sách');
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getDetail(this.id);
      console.log(this.id)
    });
    this.shareService.getClickEvent().subscribe(() => {
      this.loadEditAdd();
    });
  }

  ngOnInit(): void {
    this.loadEditAdd();
    this.getCategory();
  }
  // phanquyen
  loadEditAdd(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }

  getDetail(id: number) {
    return this.bookService.findById(id).subscribe(book => {
      this.temp = book;

      console.log(book);
    });
  }

  getAll() {
    // @ts-ignore
    this.bookService.getListBook().subscribe(book => {
      this.books = book;
    });
  }

  getCategory(): void {
    this.categoryService.getAllCategory().subscribe(category => {
      this.categories = category;
    });
  }

  decCard(number: number) {
    this.number--;

  }

  incCard(number: number) {
    this.number++;
  }

  addCart() {
    this.cartService.addCard(this.temp,this.number);
    Swal.fire('Thông báo', 'Thêm vào giỏ hàng thành công', 'success');

  }
}
