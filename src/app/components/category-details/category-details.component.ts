import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../Core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../Core/services/categories.service';
import { ICategory } from '../../Core/interfaces/icategory';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  categoryDetailsSubscribe!: Subscription;
  categoryDetails!: ICategory | null;

  ngOnInit(): void {
    this.categoryDetailsSubscribe = this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryDetailsSubscribe = this._CategoriesService
          .getSpecificCategory(params.get('id'))
          .subscribe({
            next: (res) => {
              this.categoryDetails = res.data;
              console.log(res.data);
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
    });
  }

  ngOnDestroy(): void {}
}
