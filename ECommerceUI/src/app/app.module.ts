import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule, NGXLogger, NGXLoggerHttpService, LoggerConfig } from 'ngx-logger';
import { LOGGER_CONFIG_TOKEN, loggerConfig } from './logger.config';
import { PropertyService } from './property.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { SuggestedProductsComponent } from './suggested-products/suggested-products.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OpenProductsDirective } from './directives/open-products.directive';
import { OpenProductDetailsDirective } from './directives/open-product-details.directive';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    SuggestedProductsComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    OpenProductsDirective,
    OpenProductDetailsDirective,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    LoggerModule.forRoot(loggerConfig),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        allowedDomains: ['localhost:7149'],
      },
    }),
  ],
  providers: [
  { provide: NGXLoggerHttpService, useClass: YourHttpService }, // Replace YourHttpService with your own HTTP service if needed
  { provide: LOGGER_CONFIG_TOKEN, useValue: loggerConfig },
  NGXLogger,
  PropertyService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
