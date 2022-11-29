import {Component, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {CategoryService} from "../../service/category.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../model/category";
import {Book} from "../../model/book";
import Swal from "sweetalert2";
import {formatDate} from "@angular/common";
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  loader = true;

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private router: Router,
              private title:Title) {
    this.title.setTitle('Thêm mới sách')
  }

  bookForm: FormGroup = new FormGroup({
    // code: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    discount: new FormControl(),
    author: new FormControl(),
    description: new FormControl(),
    dimension: new FormControl(),
    translator: new FormControl(),
    publishingHome: new FormControl(),
    img: new FormControl(),
    quantity: new FormControl(),
    totalPage: new FormControl(),
    releaseDate: new FormControl(),
    category: new FormControl()
  });
  categoryList: Category[];

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(value => {
      this.categoryList = value;
    });
    this.bookForm = new FormGroup({
      // code: new FormControl(),
      name: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      price: new FormControl('',[Validators.required,Validators.min(1)]),
      discount: new FormControl('',[Validators.required,Validators.min(0)]),
      author: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      description: new FormControl('',[Validators.required]),
      dimension: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      translator: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      publishingHome: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      img: new FormControl(),
      quantity: new FormControl('',[Validators.required,Validators.min(1)]),
      totalPage: new FormControl('',[Validators.required,Validators.min(1)]),
      releaseDate: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required])
    })
  }

  submit() {
    this.loader = false;
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `book/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    // const book = this.bookForm.value;
    let book: Book;
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.bookForm.patchValue({img: url});
          // @ts-ignore
          // @ts-ignore
          book = {
            // code: this.bookForm.value.code,
            name: this.bookForm.value.name,
            price: this.bookForm.value.price,
            discount: this.bookForm.value.discount,
            author: this.bookForm.value.author,
            description: this.bookForm.value.description,
            dimension: this.bookForm.value.dimension,
            translator: this.bookForm.value.translator,
            publishingHome: this.bookForm.value.publishingHome,
            img: this.bookForm.value.img,
            quantity: this.bookForm.value.quantity,
            totalPage: this.bookForm.value.totalPage,
            releaseDate: this.bookForm.value.releaseDate,
            category: this.bookForm.value.category,
            status: false,

          };
          console.log(book);
          this.bookService.Create(book).subscribe(() => {
            this.bookForm.reset();
            this.router.navigateByUrl('').then();
            Swal.fire('Thông Báo !!', 'Thêm Mới Thành Công', 'success').then();
          }, e => {
            Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Thêm Mới Thất Bại', 'error').then();
            console.log(e);
          });
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.bookForm.patchValue({imageUrl: this.selectedImage.name});
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  reset(){
    this.bookForm = new FormGroup({
      // code: new FormControl(),
      name: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      price: new FormControl('',[Validators.required,Validators.min(1)]),
      discount: new FormControl('',[Validators.required,Validators.min(0)]),
      author: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      description: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      dimension: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      translator: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      publishingHome: new FormControl('',[Validators.required,Validators.maxLength(100)]),
      img: new FormControl(),
      quantity: new FormControl('',[Validators.required,Validators.min(1)]),
      totalPage: new FormControl('',[Validators.required,Validators.min(1)]),
      releaseDate: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required])
    })
  }
}
