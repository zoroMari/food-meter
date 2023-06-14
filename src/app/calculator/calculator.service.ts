import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IIngredient, IIngredientTotal } from "src/app/ingredients/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public ingredientsPer100: IIngredient[] = [];
  public ingredients: IIngredient[] = [];
  public total = new BehaviorSubject<IIngredientTotal>(
    { name: 'TOTAL:', gram: 0, ccal: 0, protein: 0, carbon: 0, fat: 0 }
  );
  public ingredientsChange = new Subject<IIngredient[]>();

  constructor(

  ) {}

  public addIngredient(ingr: IIngredient) {
    this.ingredients.push(ingr);
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData();
  }

  public addIngredients(ingrs: IIngredient[]) {
    console.log('this.ingredients >>>', this.ingredients);
    ingrs.forEach((item: IIngredient) => this.ingredients.push(item));
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData();
  }

  public updateIngredients(newIngr: IIngredient[], ingrs: IIngredient[]) {
    if (ingrs.length < 1) return;
    else {
      const hashMap: { [id: string]: IIngredient } = newIngr.reduce((acc, cur) => {
        return { ...acc, [cur.id]: cur }
      }, {})
      ingrs = ingrs.map((item) => {
        return hashMap[item.id] ?? item
      })
      this.ingredientsChange.next(ingrs);
    }
  }

  public changeIngredientData(ingredient: IIngredient) {
    const ind = this.ingredients.findIndex((item) => item.name === ingredient.name);

    if (ind === -1) return;
    else {
      const newIngr: IIngredient = {
        name: ingredient.name,
        gram: ingredient.gram,
        ccal: +(ingredient.ccal * ingredient.gram / 100).toFixed(2),
        protein: +(ingredient.protein * ingredient.gram / 100).toFixed(2),
        carbon: +(ingredient.carbon * ingredient.gram / 100).toFixed(2),
        fat: +(ingredient.fat * ingredient.gram / 100).toFixed(2),
        id: ingredient.id,
        authorID: ingredient.authorID,
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

  public deleteAllIngr() {
    this.ingredients = [];
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData();
  }

  public changeTotalData() {
    this.total.next(
      this.ingredients.reduce((acc, cur) => {
        return {
          name: 'TOTAL:',
          gram: +(+acc.gram + +cur.gram).toFixed(2),
          ccal: +(acc.ccal + cur.ccal).toFixed(2),
          protein: +(acc.protein + cur.protein).toFixed(2),
          carbon: +(acc.carbon + cur.carbon).toFixed(2),
          fat: +(acc.fat + cur.fat).toFixed(2),
        }
      }, { name: 'TOTAL:', gram: 0, ccal: 0, protein: 0, carbon: 0, fat: 0 })
    )
  }


}
