import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../Core/interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductService = inject(ProductsService);

  detailsSubscribe!:Subscription;
  detailsProduct:IProduct | null = null; // to avoid reload HTML before data

ngOnInit(): void { //subscribe to the route params //observbale to et any change happens
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        //call api
        this.detailsSubscribe = this._ProductService.getSpecificProduct(params.get('id')).subscribe({ //get id => not null
            next:(res) =>{
              this.detailsProduct = res.data;
            },
            error:(err) =>{
              console.log(err);
            }
        })
      }
    })  
}


ngOnDestroy(): void {
    this.detailsSubscribe?.unsubscribe();
}

}
