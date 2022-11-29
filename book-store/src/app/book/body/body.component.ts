import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import {CartService} from "../../service/cart.service";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  bookList: Book[] = [];

  error: string;
  check: string[] = [];
  page = 0;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  totalElements = 0;
  pageSize: number;
  numberOfElement: number;

  // phan quyen
  username: string;
  idPatient: number;
  currentUser: string;
  role: string;
  isLoggedIn = false;

  constructor(private bookService: BookService,
              private router: Router,
              private activeRouter: ActivatedRoute,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private cartService: CartService,
              private title: Title) {
    this.title.setTitle('BookStore')
    this.shareService.getClickEvent().subscribe(() => {
      this.loadEditAdd();
    });
  }

  ngOnInit(): void {
    this.loadEditAdd();
    this.getList();
  }

  getList() {
    this.pageSize = 8;
    this.activeRouter.paramMap.subscribe(param => {
      if (param.get('id') === null && param.get('search') == null) {
        this.bookService.getListBook(this.page).subscribe(value => {
          this.totalElements = value.totalElements;
          this.bookList = value.content;
          this.numberOfElement = value.content.length;
          if (value.first) {
            this.previousPageStyle = 'none';
          } else  {
            this.previousPageStyle = 'inline-block';
          }
          if (value.last) {
            this.nextPageStyle = 'none';
          } else {
            this.nextPageStyle = 'inline-block';
          }
        }, error => "lỗi")
        return;
      }
      this.bookService.getAll(+param.get('id'), param.get('search')).subscribe(value => {
        if (value !== null) {
          this.totalElements = value.totalElements;
          this.bookList = value.content;
          this.numberOfElement = value.content.length;
          if (value.first) {
            this.previousPageStyle = 'none';
          } else  {
            this.previousPageStyle = 'inline-block';
          }
          if (value.last) {
            this.nextPageStyle = 'none';
          } else {
            this.nextPageStyle = 'inline-none';
          }
          console.log(value)
        }
      })
    });
  }

  previousPage() {
    this.page--;
    this.getList();
  }

  nextPage() {
    this.page++;
    this.getList();
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

  // thêm vào giỏ hàng
  addCart(item: Book) {
    this.cartService.addCard(item, 1);
    Swal.fire('Thông báo', 'Thêm vào giỏ hàng thành công', 'success');

  }

  delete(id: number, name: string, author: string): void {
    Swal.fire({
      title: 'Thông Báo !!',
      text: 'Bạn Muốn Xoá Sách ' + name + ' Của Tác Giả ' + author + ' Không ?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Đồng Ý'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.bookService.delete(id).subscribe(() => {
          Swal.fire('Thông Báo !!', 'Xoá Thành Công', 'success').then();
          this.getList()
        }, e => {
          Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Vui Lòng Thử Lại', 'error').then();
          console.log(e);
        });
      }
    });
  }
}
