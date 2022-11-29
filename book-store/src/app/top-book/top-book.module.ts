import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBookRoutingModule } from './top-book-routing.module';
import {TopBookComponent} from "./top-book.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [TopBookComponent],
  imports: [
    CommonModule,
    TopBookRoutingModule,
    ReactiveFormsModule
  ]
})
export class TopBookModule { }
