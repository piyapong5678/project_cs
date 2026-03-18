import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { PressToOrderComponent } from './press-to-order/press-to-order.component';
import { ProductComponent } from './product/product.component';

import { AddressComponent } from './address/address.component';
import { LoginComponent } from './login/login.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { AddminOrderComponent } from './addmin-order/addmin-order.component';
import { ProfileAllComponent } from './profile-all/profile-all.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageProductComponent } from './manage-product/manage-product.component';

import { WaitPaymentComponent } from './wait-payment/wait-payment.component';
import { SubmitCardComponent } from './submit-card/submit-card.component';
import { FooterComponent } from './footer/footer.component';
import { StoreManagementComponent } from './store-management/store-management.component'; // นำเข้า StoreManagementComponent
import { StoreDisplayComponent } from './store-display/store-display.component'; // นำเข้า StoreDisplayComponent
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'shopping-card', component: ShoppingCardComponent },
  { path: 'product/:id/press', component: PressToOrderComponent },
  { path: 'product', component: ProductComponent }, // แก้ไขคำสะกดผิด
  { path: 'profile-all', component: ProfileAllComponent },
  { path: 'address', component: AddressComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit-Address', component: EditAddressComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'addmin-order', component: AddminOrderComponent },
  { path: 'manage-product', component: ManageProductComponent },
  { path: 'submit-card/:id', component: SubmitCardComponent },
  { path: 'wait-payment', component: WaitPaymentComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'store-management', component: StoreManagementComponent },
  { path: 'store/:id', component: StoreDisplayComponent },
  // กรณีพิมพ์ URL มั่ว ให้เด้งกลับหน้า home
  { path: '**', redirectTo: 'home' } 
];

@NgModule({
  // แก้ไขบรรทัดที่ 46
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
