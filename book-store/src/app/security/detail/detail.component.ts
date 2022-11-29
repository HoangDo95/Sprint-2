import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {CustomerService} from "../../service/customer.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  customer: any;
  username: string;
  users: any = [];

  constructor(private tokenStorageService: TokenStorageService,
              private customerService: CustomerService,
              private title: Title) {
    this.title.setTitle('Thông tin tài khoản')
  }

  ngOnInit(): void {
    this.loadHeader();
    this.getUsers();
    this.customerService.getCustomer(this.username).subscribe(customers => {
      this.customer = customers;
      console.log(customers);
    });
  }

  getUsers(): void {
    this.customerService.getAll().subscribe(user => {
      this.users = user;
      console.log(user);
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }

}
