import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { CalculatorService } from "../calculator/calculator.service";
import { IIngredient } from "./ingredients.model";
import { IngredientsService } from "./ingredients.service";

@Injectable({ providedIn: 'root' })
export class IngredientStoreService {
  constructor(
    private _http: HttpClient,
    private _ingredientsService: IngredientsService,
    private _calculatorService: CalculatorService,
    private _authService: AuthService,
  ) {}

  public fetchIngredients() {
    const userId = this._authService.user.getValue().id;
    return this._http.get<{ [key: string]: IIngredient }>(
        `https://food-meter-d7f59-default-rtdb.firebaseio.com/ingredients/user/${userId}.json`
      ).pipe(
      map((responseData) => {
        const ingrData: IIngredient[] = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key) && responseData[key].authorID === userId) {
            ingrData.push({ ...responseData[key] })
          }
        }
        return ingrData;
      }),
      tap((ingr) => {
        if (ingr) {
          this._ingredientsService.setIngredients(ingr);
          // this._calculatorService.ingredientsPer100 = ingr;
        }
        else return;
      })
    )
  }

  public storeIngredients() {
    const ingr: IIngredient[] = this._ingredientsService.ingredients;
    const userId = this._authService.user.getValue().id;

    this._http.put<{ name: string }>(
      `https://food-meter-d7f59-default-rtdb.firebaseio.com/ingredients/user/${userId}.json`,
      ingr
    ).subscribe((value) => {});
  }

}


