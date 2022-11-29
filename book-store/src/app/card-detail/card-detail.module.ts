import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDetailRoutingModule } from './card-detail-routing.module';
import {CardDetailComponent} from "./card-detail.component";


@NgModule({
  declarations: [CardDetailComponent],
  imports: [
    CommonModule,
    CardDetailRoutingModule
  ]
})
export class CardDetailModule { }
