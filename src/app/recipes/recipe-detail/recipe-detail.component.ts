import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingridient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.recipe = this.recipeService.getRecipes().find((recipe) => {
    //       return recipe.name === params.id
    //     });
    //   }
    // ) First approach

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // this.recipe = this.recipeService.getRecipe(this.id);
        this.store.select('recipes')
          .pipe(
            map(recipeState => {
              return recipeState.recipes
                .find((recipe, index) => {
                  return index === this.id;
                });
            })
          ).subscribe(recipe => {
            this.recipe = recipe;
          });
      }
    )
  }

  // addToShoppingList(ingredient: Ingredient[]) {
  //   ingredient.forEach(
  //     (i) => {
  //       this.shoppingService.addIngredient(i);
  //     }
  //   )
  // }  FIRST APPROACH

  addToShoppingList(ingredient: Ingredient[]) {
    this.recipeService.addIngredientsToShoppingList(ingredient)
  }

  deleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
  }
}
