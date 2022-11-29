import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_URL = 'http://localhost:8080/api/public/category';
  constructor(private http: HttpClient) { }

  getAllCategory():Observable<any>{
    return this.http.get<any>(this.API_URL +'/list');
  }

}
