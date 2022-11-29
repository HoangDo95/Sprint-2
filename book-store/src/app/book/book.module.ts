import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import {BodyComponent} from './body/body.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateComponent } from './create/create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [BodyComponent, BookDetailComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,

    BrowserAnimationsModule,
    MatTooltipModule
  ]
})
export class BookModule { }
