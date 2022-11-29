import {AppUser} from './appUser';

export interface Customer {
  id?: number;
  name?: string;
  address?: string;
  birthDay?: string;
  email?: string;
  phone?: number;
  gender?: number;
  status?: false;
  appUser?: AppUser;
}
