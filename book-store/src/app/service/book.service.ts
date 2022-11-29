import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {Customer} from "../model/customer";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  API_URL = 'http://localhost:8080/api/public/book';

  constructor(private http: HttpClient) {
  }

  getAll(idCategory: number, search: string): Observable<any> {
    if (idCategory == 0) {
      return this.http.get<any>(this.API_URL + '/list?name=' + search);
    } else {
      return this.http.get<any>(this.API_URL + '/list?idCategory=' + idCategory + '&name=@');
    }
  }

  getListBook(page: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/list?page=' + page);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/list/show/' + id);
  }


  Create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL + '/create', book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(this.API_URL + '/update/' + id, book);
  }

  delete(id: number): Observable<any> {
    // @ts-ignore
    return this.http.delete<any>(this.API_URL + '/delete/' + id);
  }


  topBook(startDate: string, endDate: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL +'/topBook/' + startDate + '/' + endDate);
  }


}
