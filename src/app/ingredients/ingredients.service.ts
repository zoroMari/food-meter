import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IIngredient } from "src/app/shared/ingredients.model";

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private _ingredients: IIngredient[] = [
    { name: 'Egg', gram: 100, ccal: 5, protein: 10, carbon: 15, fat: 20 },
    { name: 'Chicken',  gram: 100, ccal: 12, protein: 20, carbon: 30, fat: 40 },
    { name: 'Salmon', gram: 100,  ccal: 14, protein: 20, carbon: 32, fat: 50 },
    { name: 'Bread',  gram: 100, ccal: 8, protein: 14, carbon: 30, fat: 60 },
  ];

  public ingredientsChange = new BehaviorSubject<IIngredient[]>(this.ingredients);
  public isEditMode = new BehaviorSubject<boolean>(false);

  public get ingredients() {
    return JSON.parse(JSON.stringify(this._ingredients))
  }

  public editIngredient(ingr: IIngredient) {
    this.isEditMode.next(true);
  }

  public addIngredient(ingr: IIngredient) {
    this._ingredients.push(ingr);
    this.ingredientsChange.next(this.ingredients);
  }

  public saveChangedIngredient(newIngr: IIngredient) {
    this.isEditMode.next(false);
    const ind = this._ingredients.findIndex((item) => item.name === newIngr.name);

    if (ind === -1) return;
    else {
      this._ingredients[ind] = newIngr;
      this.ingredientsChange.next(this.ingredients);
    }
  }

  public cancelChangedIngredient() {
    this.isEditMode.next(false);
    this.ingredientsChange.next(this.ingredients);
  }

  public deleteIngredient(ingr: IIngredient) {
    const ind = this._ingredients.findIndex((item) => item.name === ingr.name);

    this._ingredients.splice(ind, 1);
    this.ingredientsChange.next(this.ingredients);
  }
}
