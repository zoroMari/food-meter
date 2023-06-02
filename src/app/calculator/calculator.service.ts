import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IIngredient } from "src/ingredients.model";
import { IngredientsService } from "../ingredients/ingredients.service";

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public ingredientsPer100: IIngredient[] = [...this._ingredientsService.ingredients];
  public ingredients: IIngredient[] = [
    { name: 'Egg', gram: 100, ccal: 5, protein: 10, carbon: 15, fat: 20 },
    { name: 'Chicken',  gram: 100, ccal: 12, protein: 20, carbon: 30, fat: 40 },
    { name: 'Salmon', gram: 100,  ccal: 14, protein: 20, carbon: 32, fat: 50 },
  ];
  public total = new BehaviorSubject<IIngredient>(
    { name: 'TOTAL:', gram: 0, ccal: 0, protein: 0, carbon: 0, fat: 0 }
  );
  public ingredientsChange = new Subject<IIngredient[]>();

  constructor(
    private _ingredientsService: IngredientsService,
  ) {}

  public changeIngredientData(ingredient: IIngredient) {
    const ind = this.ingredients.findIndex((item) => item.name === ingredient.name);

    if (ind === -1) return;
    else {
      const newIngr: IIngredient = {
        name: ingredient.name,
        gram: ingredient.gram,
        ccal: Math.round(ingredient.ccal * ingredient.gram / 100),
        protein: Math.round(ingredient.protein * ingredient.gram / 100),
        carbon: Math.round(ingredient.carbon * ingredient.gram / 100),
        fat: Math.round(ingredient.fat * ingredient.gram / 100),
      }
      this.ingredients[ind] = newIngr;
      this.ingredientsChange.next(this.ingredients);
    }

    this.changeTotalData();
  }

  public deleteIngr(ingredient: IIngredient) {
    const ind = this.ingredients.findIndex((item) => item.name === ingredient.name);

    this.ingredients.splice(ind, 1);
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData();

  }


  public changeTotalData() {
    this.total.next(
      this.ingredients.reduce((acc, cur) => {
        return {
          name: 'TOTAL:',
          gram: acc.gram + cur.gram,
          ccal: acc.ccal + cur.ccal,
          protein: acc.protein + cur.protein,
          carbon: acc.carbon + cur.carbon,
          fat: acc.fat + cur.fat,
        }
      }, { name: 'TOTAL:', gram: 0, ccal: 0, protein: 0, carbon: 0, fat: 0 })
    )
  }


}
