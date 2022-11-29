import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../security/login/login.component";
import {TopBookComponent} from "./top-book.component";


const routes: Routes = [
  { path: 'topBook',
    component: TopBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopBookRoutingModule { }
