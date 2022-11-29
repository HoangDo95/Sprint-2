import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Customer} from '../../model/customer';
import {CustomerService} from '../../service/customer.service';
import {TokenStorageService} from '../../service/token-storage.service';
import * as firebase from 'firebase';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatcontent') chatcontent: ElementRef;
  rooms: any[] = [];
  user = '';
  nickname: Customer = {};
  role: string;
  chats = [];
  scrolltop: number = null;
  chatForm: FormGroup = new FormGroup({
      message: new FormControl()
    }
  );
  displayedColumns: string[] = ['roomname'];
  matcher = new MyErrorStateMatcher();

  constructor(private customerService: CustomerService,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.customerService.getCustomer(this.tokenStorageService.getUser().username).subscribe(value => {
        this.nickname = value;
        this.role = this.tokenStorageService.getUser().roles[0];
        if (this.role === 'ROLE_USER') {
          firebase.database().ref('chats/').orderByChild('rooms').equalTo(this.nickname.name).on('value', (resp: any) => {
            this.chats = [];
            this.chats = snapshotToArray(resp);
            console.log(snapshotToArray(resp));
            setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
          });
        } else {
          firebase.database().ref('rooms/').on('value', resp => {
            this.rooms = snapshotToArray(resp);
            this.user = this.rooms[0].username;
            console.log(this.rooms);
            setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
          });
        }
        this.chatForm = this.formBuilder.group({
          message: [null, Validators.required]
        });
      });
    }
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.user = this.nickname.name;
    console.log(chat.user);
    chat.name = this.nickname.name;
    if (this.role === 'ROLE_USER') {
      chat.rooms = this.nickname.name;
      const newMessage = firebase.database().ref('chats/').push();
      newMessage.set(chat);
      this.chatForm = this.formBuilder.group({
        message: [null, Validators.required]
      });
    } else {
      chat.rooms = this.user;
      const newMessage = firebase.database().ref('chats/').push();
      newMessage.set(chat);
      this.chatForm = this.formBuilder.group({
        message: [null, Validators.required]
      });
    }
    if (this.role === 'ROLE_USER') {
      firebase.database().ref('rooms/').orderByChild('username').equalTo(this.nickname.name).once('value', (snapshot: any) => {
        if (snapshot.exists()) {
        } else {
          const room = new FormGroup({}).value;
          room.username = this.nickname.name;
          room.name = this.nickname.name;
          const newRoom = firebase.database().ref('rooms/').push();
          newRoom.set(room);
        }
      });
    }
  }

  enterChatRoom(roomname: any) {
    this.user = roomname;
    firebase.database().ref('chats/').orderByChild('rooms').equalTo(roomname).on('value', (resp1: any) => {
      this.chats = [];
      this.chats = snapshotToArray(resp1);
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
  }
}
