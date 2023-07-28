import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainProductComponent } from './main-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';

const routes: Routes = [
  {
    path: '',
    component: MainProductComponent,
  },
  {
    path: 'productDetails/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: ShoppingCardComponent,
  },
];

@NgModule({
  declarations: [MainProductComponent, ProductDetailsComponent, ShoppingCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MainProductModule { }


