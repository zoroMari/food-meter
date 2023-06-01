import { Injectable } from "@angular/core";
import { IIngredient } from "src/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private _ingredients: IIngredient[] = [
    { name: 'Egg', gram: 100, ccal: 5, protein: 10, carbon: 15, fat: 20 },
    { name: 'Chicken',  gram: 100, ccal: 12, protein: 20, carbon: 30, fat: 40 },
    { name: 'Salmon', gram: 100,  ccal: 14, protein: 20, carbon: 32, fat: 50 },
    // { name: 'Bread',  gram: 100, ccal: 8, protein: 14, carbon: 30, fat: 60 },
  ];

  public get ingredients() {
    return this._ingredients
  }




}
