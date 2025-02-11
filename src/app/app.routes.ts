import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProudctsComponent } from './components/proudcts/proudcts.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './Core/guards/auth.guard';
import { loggedGuard } from './Core/guards/logged.guard';
import { DetailsComponent } from './components/details/details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      {
        path: 'forgetpassword',
        component: ForgetpasswordComponent,
        title: 'Forget Password',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'products', component: ProudctsComponent, title: 'Products' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Product Details',
      },
      {
        path: 'categoryDetails/:id',
        component: CategoryDetailsComponent,
        title: 'Category Details',
      },
      {
        path: 'allorders',
        component: AllOrdersComponent, //when payment is done successfully
        title: 'All Orders',
      },
      {
        path: 'orders/:cartId',
        component: OrdersComponent, //form to add shipping details
        title: 'Orders',
      },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
