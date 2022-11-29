import { Component } from '@angular/core';
import * as firebase from 'firebase';

const config = {
  // apiKey: 'AIzaSyA-8vBTNhQ5ixLWTzDtVUVjKW2fYoTUymg',
  // apiKey: 'AIzaSyA24pCmeT6oZps2Nc3gSMqf5vVGzb8SbTM',
  apiKey: 'AIzaSyC_FbPy27TiOBn2N86DORTxfQMrmpEtZpg',

  // databaseURL: 'https://angularchat-519bf-default-rtdb.firebaseio.com',
  // databaseURL: 'https://chat-746ba-default-rtdb.asia-southeast1.firebasedatabase.app',
  databaseURL: 'https://chat-68de1-default-rtdb.asia-southeast1.firebasedatabase.app',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';

  constructor() {
    firebase.initializeApp(config);
  }
}
