import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { IIngredient } from "../shared/ingredients.model";
import { IngredientsService } from "./ingredients.service";

@Injectable({ providedIn: 'root' })
export class IngredientStoreService {
  constructor(
    private _http: HttpClient,
    private _ingredientsService: IngredientsService,
  ) {}

  public fetchIngredients() {
    return this._http.get<{ [key: string]: IIngredient }>('https://food-meter-d7f59-default-rtdb.firebaseio.com/ingredients.json').pipe(
      map((responseData) => {
        const ingrData: IIngredient[] = [];
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            ingrData.push({ ...responseData[key] })
          }
        }
        return ingrData;
      }),
      tap((ingr) => {
        if (ingr) {
          this._ingredientsService.setIngredients(ingr);
        }
        else return;
      })
    )
  }

  public storeIngredients() {
    const ingr: IIngredient[] = this._ingredientsService.ingredients;

    this._http.put<{ name: string }>(
      'https://food-meter-d7f59-default-rtdb.firebaseio.com/ingredients.json',
      ingr
    ).subscribe((value) => {});
  }

}
