import {Category} from "./category";

export interface Book {
  id?: number;
  code?:string;
  name?:string;
  price?:number;
  discount?:number;
  author?:string;
  description?:string; //mo ta
  dimension?:string;    //kich thuoc
  translator?:string;    //dịch giả
  publishingHome?:string;   //nhà xuat ban
  img?:string;
  quantity?:number;
  totalPage?:number;
  releaseDate?:string;
  category?: Category;
  status?:boolean;
  amount?: number;
}

