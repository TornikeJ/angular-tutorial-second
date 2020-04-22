import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeAction from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService, private actions$: Actions, private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // const recipes = this.recipeService.getRecipes();
        // return this.dataStorageService.fetchRecipes();

        return this.store.select('recipes').pipe(
            take(1),
            map(recipeState => {
                return recipeState.recipes;
            }),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipeAction.FetchRecipes());
                    return this.actions$.pipe(
                        ofType(RecipeAction.SET_RECIPES),
                        take(1)
                    );
                } else {
                    return of(recipes);
                }
            })
        )
    }
}

