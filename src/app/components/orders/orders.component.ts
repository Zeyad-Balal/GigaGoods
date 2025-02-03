import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../Core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _OrdersService = inject(OrdersService);


  cartID: string | null = null;

  ordersForm: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [Validators.required]],
  }
  )

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartID = params.get('cartId'); // retrieve the cart id from the route params
      }
    })
  }

  orderSubmit() {
    this._OrdersService.checkout(this.cartID, this.ordersForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          window.open(res.session.url , '_blank'); // redirect the user to the payment page, NEW TAB
        }
      },
      error: (err) => {
        console.log(err);
      }
    }); // send the order details to the server
  }

}
