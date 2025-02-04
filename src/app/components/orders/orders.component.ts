import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../Core/services/orders.service';
import emailjs from '@emailjs/browser';
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
          this.sendEmail(); // Send email after successful checkout
          console.log(this.ordersForm.value.phone);
          window.open(res.session.url , '_blank'); // redirect the user to the payment page, NEW TAB
        }
      },
      error: (err) => {
        console.log(err);
      }
    }); // send the order details to the server
  }




  sendEmail() {
    const serviceID = 'dira-service';
    const templateID = 'template_tqpy3r9';
    const publicKey = 'G3JStaEtPp0rodCLk';

    const emailParams = {
      user_address: this.ordersForm.value.details,
      user_phone: this.ordersForm.value.phone,
      user_city: this.ordersForm.value.city,
      order_date: new Date().toLocaleString(), // Adds order submission date
    };

    emailjs.send(serviceID, templateID, emailParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

}
