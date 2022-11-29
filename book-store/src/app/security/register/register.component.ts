import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {checkBirthDay} from "../../validation/check-day";
import {Title} from "@angular/platform-browser";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  loader = true;
  customerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    birthDay: new FormControl('', [Validators.required, checkBirthDay]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });
  constructor(private title: Title,
              private customerService: CustomerService,
              private router: Router) {
    this.title.setTitle('Đăng Ký Tài Khoản Khách Hàng')
  }

  ngOnInit(): void {
  }
  submit(): void {
    let customer: Customer;

    customer = {
      name: this.customerForm.value.name,
      address: this.customerForm.value.address,
      appUser: {
        email: this.customerForm.value.email,
        username: this.customerForm.value.username,
        password: this.customerForm.value.password,
      },
      birthDay: this.customerForm.value.birthDay,
      email: this.customerForm.value.email,
      gender: this.customerForm.value.gender,
      phone: this.customerForm.value.phone,
    };
    console.log(customer);
    this.customerService.saveCustomer(customer).subscribe(value => {
      console.log(value);
      this.router.navigate(['/login']).then();
      Swal.fire('Thông Báo !!', 'Đăng Ký Tài Khoản Thành Công', 'success').then();
    }, error => {
      Swal.fire('Thông Báo !!', 'Đã Có Lỗi Xảy Ra. Đăng Ký Tài Khoản Thất Bại', 'error').then();
      console.log(error);
    });
  }

  reset(): void {
    this.customerForm.reset();
  }

}
