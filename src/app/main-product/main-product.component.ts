import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss']
})
export class MainProductComponent implements OnInit {
  productData: any;
  fiveproductData: any;

  //pagination
  noOfPages: any;
  currentValueToShow: number = 1;
  sliceFValue: number = 0;
  sliceLValue: number = 5;
  shoppingCartData: any =[];
  Items: any;
  @ViewChild('searchVal') searchVal: ElementRef | any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((data:any) => {
      this.productData = data;
      this.noOfPages = this.counter(this.productData.length / 5);
      this.getFiveProducts();
      this.shoppingCartData = JSON.parse(<any>localStorage.getItem('cartData'));
    });
  }

  //for creating number of pages using array length
  counter(i: number) {
    return new Array(i);
  }

  //get five product on each page
  getFiveProducts() {
    this.fiveproductData = this.productData
      ? this.productData.slice(this.sliceFValue, this.sliceLValue)
      : [];
    this.Items = this.fiveproductData;
  }

  //pagination page logic for 5 record per pages
  getPaginationValue(val: number, direction: string) {
    val = val + 1;
    if (
      (this.noOfPages.length == this.currentValueToShow &&
        direction == 'next') ||
      (direction == 'previous' && this.currentValueToShow == 1)
    ) {
      return;
    }
    if (direction == 'previous') {
      this.currentValueToShow = this.currentValueToShow - 1;
      val = this.currentValueToShow;
    } else if (direction == 'next') {
      this.currentValueToShow = this.currentValueToShow + 1;
      val = this.currentValueToShow;
    }
    for (let i = 1; i < this.noOfPages.length + 1; i++) {
      if (val == i) {
        this.sliceFValue = val * 5 - 5;
        this.sliceLValue = val * 5;
        break;
      }
    }
    if (direction.length > 0) {
      this.getFiveProducts();
    } else if (this.currentValueToShow > val || this.currentValueToShow < val) {
      this.getFiveProducts();
      this.currentValueToShow = val;
    }
    this.searchVal.nativeElement.value = '';
  }

  // search using Title and price from the 5 record list
  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.Items = this.fiveproductData.filter((item: any) => {
        if (
          item.title.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) !=
            -1 ||
          String(item.price)
            .toLocaleLowerCase()
            .indexOf(val.toLocaleLowerCase()) != -1
        ) {
          return item;
        }
      });
    } else {
      this.Items = this.fiveproductData;
    }
  }
}
