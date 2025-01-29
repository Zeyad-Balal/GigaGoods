import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { IProduct } from '../../Core/interfaces/iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
private readonly _ProductService = inject(ProductsService);
constructor() { }

productList:IProduct[] = [];

//to load products once the component is opened
ngOnInit(): void {
  this._ProductService.getAllProducts().subscribe({
    next: (res) => {
      this.productList = res.data;
      console.log(res.data);
    },
    error: (err) => {
      console.log(err);
    },
  });
}

}
