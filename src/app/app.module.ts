import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ResponsiveToolbarComponent } from './responsive-toolbar/responsive-toolbar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { ProfileComponent } from './profile/profile.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SearchComponent } from './search/search.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { PressToOrderComponent } from './press-to-order/press-to-order.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProductComponent } from './product/product.component';
import {MatBadgeModule} from '@angular/material/badge';
import { PaymentComponent } from './payment/payment.component';
import { WaitSentComponent } from './wait-sent/wait-sent.component';
import { SendSuccessComponent } from './send-success/send-success.component';
import { SelectedAddressComponent } from './selected-address/selected-address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { AddminOrderComponent } from './addmin-order/addmin-order.component';
import { AddminPaymentComponent } from './addmin-payment/addmin-payment.component';
import { AddminWaitSentComponent } from './addmin-wait-sent/addmin-wait-sent.component';
import { AddminSendSuccessComponent } from './addmin-send-success/addmin-send-success.component';
import { ProfileAllComponent } from './profile-all/profile-all.component';
import { CancelProductComponent } from './cancel-product/cancel-product.component';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { ManageProductComponent } from './manage-product/manage-product.component';
import {MatTableModule} from '@angular/material/table';


import { WaitPaymentComponent } from './wait-payment/wait-payment.component';
import { SubmitCardComponent } from './submit-card/submit-card.component';
import { FooterComponent } from './footer/footer.component';
import { RecordComponent } from './record/record.component';
import { AddminCancelComponent } from './addmin-cancel/addmin-cancel.component';
import { StoreManagementComponent } from './store-management/store-management.component';
import { StoreDisplayComponent } from './store-display/store-display.component';



@NgModule({
  declarations: [
    AppComponent,
    ResponsiveToolbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    OrderComponent,
    ShoppingCardComponent,
    ProfileComponent,
    SearchComponent,
    AddressComponent,
    AddAddressComponent,
    CartProductComponent,
    PressToOrderComponent,
    ProductComponent,
    PaymentComponent,
    WaitSentComponent,
    SendSuccessComponent,
    SelectedAddressComponent,
    EditAddressComponent,
    AddProductComponent,
    EditProductComponent,

    AddminOrderComponent,
    AddminPaymentComponent,
    AddminWaitSentComponent,
    AddminSendSuccessComponent,
    ProfileAllComponent,
    CancelProductComponent,
    ManageProductComponent,
    

    WaitPaymentComponent,
      SubmitCardComponent,
      FooterComponent,
      RecordComponent,
      AddminCancelComponent,
      StoreManagementComponent,
      StoreDisplayComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatBadgeModule,
    HttpClientModule,
    MatRadioModule,
    MatTableModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
