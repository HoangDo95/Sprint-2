import {Cart} from "./cart";

export interface History {
  id?: number;
  name?: string;
  address?: string;
  phone?: number;
  cartList?: Cart[]
}
