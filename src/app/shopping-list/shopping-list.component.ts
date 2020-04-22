import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  activeLinkId;
  private igChangeSub: Subscription

  constructor(
    private _shoppingService: ShoppingListService,
    private _route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.router.navigate([]);
    // this.ingredients = this._shoppingService.getIngredients();
    // this.igChangeSub = this._shoppingService.ingredientChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients
    //     this.router.navigate([]);
    //   })

    this._route.queryParamMap.subscribe(
      (data: ParamMap) => {
        const id = data.get('edit');
        if (id !== null) {
          this.activeLinkId = +id;
        } else {
          this.activeLinkId = null;
        }
      }
    );
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

  // addIngredient(ingredient: Ingredient) {
  //   this.shoppingService.addIngredient(ingredient);
  // }
  onEditItem(index: number) {
    // this._shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.router.navigate([], {
    //   relativeTo: this._route,
    //   queryParams: {
    //     edit: index
    //   }
    // });
  }

}
