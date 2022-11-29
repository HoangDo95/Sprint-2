import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../service/token-storage.service';
import {AuthService} from '../../service/auth.service';
import {ShareService} from '../../service/share.service';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {AppUser} from "../../model/appUser";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../model/customer";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roles: string[] = [];
  username: string;
  returnUrl: string;

  socialUser: SocialUser;
  loggedIn: boolean;
  userList: AppUser[] = [];

  constructor(private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private shareService: ShareService,
              private title: Title,
              private socialAuthService: SocialAuthService,
              private customerService: CustomerService
  ) {
    this.title.setTitle('Đăng nhập');
  }

  formGroup = this.formBuild.group({
      username: [''],
      password: [''],
      remember_me: ['']
    }
  );

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    if (this.tokenStorageService.getToken()) {
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.loggedIn = (user != null);
    });
    this.customerService.getAllUser().subscribe(value => {
      this.userList = value;
    });
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(data => {
      if (this.formGroup.value.remember_me === true) {
        this.tokenStorageService.saveTokenLocal(data.token);
        this.tokenStorageService.saveUserLocal(data);
      } else {
        this.tokenStorageService.saveTokenSession(data.token);
        this.tokenStorageService.saveUserSession(data);
      }
      this.authService.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
      this.roles = this.tokenStorageService.getUser().roles;
      this.formGroup.reset();
      this.router.navigateByUrl(this.returnUrl);
      Swal.fire('Thông báo', 'Đăng nhập thành công', 'success');
      this.shareService.sendClickEvent();
    }, err => {
      this.authService.isLoggedIn = false;
      Swal.fire('Thông báo', 'Đăng nhập thất bại', 'error');
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then();
    this.socialAuthService.authState.subscribe(value => {
      this.socialUser = value;
      const id = this.userList[this.userList.length - 1].id;
      const appUser: AppUser = {
        id: id + 1,
        email: this.socialUser.email,
        status: false,
        username: this.socialUser.name,
        password: this.socialUser.id,
        creationDate: this.getCurrenDay(),
      };
      this.customerService.addNewUser(appUser).subscribe(value1 => {
        const customer: Customer = {
          name: this.socialUser.name,
          address: '',
          appUser: appUser,
          birthDay: '',
          email: this.socialUser.email,
          phone: null,
          gender: null,
          status: false,
        };
        this.formGroup = this.formBuild.group({
          username: [appUser.username],
          password: [appUser.password],
          remember_me: ['']
        });
        this.onSubmit();
        this.customerService.saveCustomerGmail(customer).subscribe(value2 => {
          this.socialAuthService.authState.subscribe(value3 => {
          });
        });
      });
    }, error => {
      console.log(error);
    });
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then();
  // }

  signOut(): void {
    this.socialAuthService.signOut().then();
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then();
  }

  getCurrenDay(): string {
    return formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }
  
}
