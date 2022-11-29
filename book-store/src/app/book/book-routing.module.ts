import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyComponent} from "./body/body.component";
import {BookDetailComponent} from "./book-detail/book-detail.component";
import {CreateComponent} from "./create/create.component";
import {UpdateComponent} from "./update/update.component";


const routes: Routes = [
  { path: 'create',
    component: CreateComponent
  },
  { path: 'list/:id/:search',
    component: BodyComponent
  },
  { path: 'list',
    component: BodyComponent
  },
  { path: 'show/:id',
    component: BookDetailComponent
  },
  { path: 'update/:id',
    component: UpdateComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
