import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./main-product/main-product.module').then((m) => m.MainProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

