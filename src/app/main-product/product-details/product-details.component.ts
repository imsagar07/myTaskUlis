import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: any;
  constructor(
    private route: ActivatedRoute,
    private apiSerive: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.apiSerive.getProductDetails(params.id).subscribe((data: any) => {
        console.log(data);
        this.productDetails = data;
      });
    });
  }

  //insert product to the cart and send to cart page
  goToCard(item: any) {
    let cardData = [];
    cardData = localStorage.getItem('cartData')
      ? JSON.parse(<any>localStorage.getItem('cartData'))
      : [];
    let insertValueLoop = false;
    if (cardData.length > 0) {
      for (let i = 0; i < cardData.length; i++) {
        if (cardData[i].id == item.id) {
          cardData[i].quantity += 1;
          insertValueLoop = true;
          break;
        }
      }
    }
    if (!insertValueLoop) {
      item.quantity = 1;
      cardData.push(item);
    }

    localStorage.setItem('cartData', JSON.stringify(cardData));
    alert('Product Added to Cart Successfully!!');
    this.router.navigate(['/product/cart']);
  }
}
