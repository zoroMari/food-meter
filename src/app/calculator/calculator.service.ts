import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IIngredient, IIngredientInCalc, IIngredientTotal } from "src/app/ingredients/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public ingredients: IIngredientInCalc[] = [];
  public total = new BehaviorSubject<IIngredientTotal>(
    { name: 'TOTAL:', actualWeight: 0, ccal: 0, protein: 0, carbon: 0, fat: 0 }
  );
  public ingredientsChange = new Subject<IIngredientInCalc[]>();

  constructor(

  ) {}

  public addIngredient(ingr: IIngredient) {
    const index = this.ingredients.length;
    this.ingredients.push(this.transformIntoIngrForCalc(ingr, index, null));
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData(this.ingredients);
  }

  public addIngredients(ingrs: IIngredient[]) {
    let index = this.ingredients.length;

    ingrs.forEach((item: IIngredient) => {
      this.ingredients.push(this.transformIntoIngrForCalc(item, index, null))
      index++
    });
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData(this.ingredients);
  }

  public updateIngredientsPer100Info(newIngr: IIngredient, ingrs: IIngredientInCalc[]) {
    const res = ingrs.map((item) => {
      if (item.id === newIngr.id) {

        return {
          ...item,
          ccalPer100: newIngr.ccal,
          proteinPer100: newIngr.protein,
          carbonPer100: newIngr.carbon,
          fatPer100: newIngr.fat,
        }
      } else return item;
    });


    this.ingredients = res;
    this.changeAllIngredientsData(this.ingredients);
  }

  public changeIngredientData(ingr: IIngredientInCalc) {
    const ind = this.ingredients.findIndex((item) => item.id === ingr.id && item.index === ingr.index);

    if (ind === -1) return;
    else {
      this.ingredients[ind] = {
        ...ingr,
        ccal: +(ingr.ccalPer100 * ingr.actualWeight / 100).toFixed(2),
        protein: +(ingr.proteinPer100 * ingr.actualWeight / 100).toFixed(2),
        carbon: +(ingr.carbonPer100 * ingr.actualWeight / 100).toFixed(2),
        fat: +(ingr.fatPer100 * ingr.actualWeight / 100).toFixed(2),
      };
      this.ingredientsChange.next(this.ingredients);
    }

    this.changeTotalData(this.ingredients);
  }

  public changeAllIngredientsData(ingr: IIngredientInCalc[]) {
    const res = ingr.map((item) => {
      return {
        ...item,
        ccal: +(item.ccalPer100 * item.actualWeight / 100).toFixed(2),
        protein: +(item.proteinPer100 * item.actualWeight / 100).toFixed(2),
        carbon: +(item.carbonPer100 * item.actualWeight / 100).toFixed(2),
        fat: +(item.fatPer100 * item.actualWeight / 100).toFixed(2),
      }
    })

    this.ingredients = res;
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData(this.ingredients);
  }

  public deleteIngr(ingredient: IIngredientInCalc) {
    const ind = this.ingredients.findIndex((item) => item.name === ingredient.name);

    this.ingredients.splice(ind, 1);
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData(this.ingredients);
  }

  public deleteAllIngr() {
    this.ingredients = [];
    this.ingredientsChange.next(this.ingredients);
    this.changeTotalData(this.ingredients);
  }

  public changeTotalData(ingr: IIngredientInCalc[]) {
    this.total.next(
      ingr.reduce((acc, cur) => {
        return {
          name: 'TOTAL:',
          actualWeight: +(acc.actualWeight + cur.actualWeight).toFixed(2),
          ccal: +(acc.ccal + cur.ccal).toFixed(2),
          protein: +(acc.protein + cur.protein).toFixed(2),
          carbon: +(acc.carbon + cur.carbon).toFixed(2),
          fat: +(acc.fat + cur.fat).toFixed(2),
        }
      }, { name: 'TOTAL:', actualWeight: 0, ccal: 0, protein: 0, carbon: 0, fat: 0 })
    )
  }

  public transformIntoIngrForCalc(ingr: IIngredient, ingrIndex: number, actualWeight: number): IIngredientInCalc {
    const weight = actualWeight ? actualWeight : 100;

    return {
      index: ingrIndex,
      name: ingr.name,
      id: ingr.id,
      authorID: ingr.authorID,
      gram: ingr.gram,
      actualWeight: weight,
      ccal: +(ingr.ccal * weight / 100).toFixed(2),
      ccalPer100: ingr.ccal,
      protein: +(ingr.protein * weight / 100).toFixed(2),
      proteinPer100: ingr.protein,
      carbon: +(ingr.carbon * weight / 100).toFixed(2),
      carbonPer100: ingr.carbon,
      fat: +(ingr.fat * weight / 100).toFixed(2),
      fatPer100: ingr.fat,
    }
  }
}
