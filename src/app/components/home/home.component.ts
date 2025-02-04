import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { IProduct } from '../../Core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Core/services/categories.service';
import { ICategory } from '../../Core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SplitTextPipe } from '../../Core/pipes/split-text.pipe';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    UpperCasePipe,
    CurrencyPipe,
    SplitTextPipe,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  constructor() {}
  search_value: string = '';
  productList: IProduct[] = [];
  categoriesList: ICategory[] = [];

  getAllProductsSubscription!: Subscription;
  getAllCategoriesSubscription!: Subscription;

  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  //to load products once the component is opened
  ngOnInit(): void {
    this.getAllCategoriesSubscription = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categoriesList = res.data; //[{ _id: '1', name: 'category1' }];
        },
      });
    this.getAllProductsSubscription = this._ProductService
      .getAllProducts()
      .subscribe({
        next: (res) => {
          this.productList = res.data;
          console.log(res.data);
        },
      });
  }


  //to add product to cart
  addToCart(id: string): void {
  this._CartService.addProductToCart(id).subscribe({
    next: (res) => {
      console.log(res);
      this._ToastrService.success('Product added to cart successfully' , 'GigaGoods');

    },
    error: (err) => {
      console.log(err);
    },
  });
}

  ngOnDestroy(): void {
    //to unsubscribe from the observable (get all products)
    this.getAllProductsSubscription?.unsubscribe(); /* ? to check if the observable is null or not*/
    this.getAllCategoriesSubscription?.unsubscribe();
  }
}
