import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClipboardComponent } from './clipboard/clipboard.component';
import { PricingComponent } from '../../../practice/src/app/pricing/pricing.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { SharedModule } from './shared/shared-module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { authReducer } from './auth/store/auth.reducer';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RecipeEffects } from './recipes/store/recipe.effect';

// const appRoute: Routes = [
//   { path: 'pricing', component: PricingComponent },
//   { path: 'clipboard', component: ClipboardComponent }
// ];


@NgModule({
  declarations: [
    AppComponent,
    ClipboardComponent,
    PricingComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    HttpModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    // RouterModule.forRoot(appRoute)
  ],
  providers: [ShoppingListService, RecipeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
