import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LiveVisitorsListComponent } from './live-visitors-list/live-visitors-list.component';
import { appRoutes } from './routes';
import { GraphsComponent } from './graphs/graphs.component';
import { AllVisitorsComponent } from './all-visitors/all-visitors.component';

@NgModule({
  declarations: [	
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    CheckoutComponent,
    LiveVisitorsListComponent,
    GraphsComponent,
      AllVisitorsComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxChartsModule,
  ],
  providers: [AuthService, ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
