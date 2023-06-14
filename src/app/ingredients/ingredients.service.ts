import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { IIngredient } from "src/app/ingredients/ingredients.model";
import { AuthService } from "../auth/auth.service";
import { CalculatorService } from "../calculator/calculator.service";

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private _ingredients: IIngredient[] = [];

  public isIngredientChange = new Subject<IIngredient[]>();
  public isEditMode = new BehaviorSubject<boolean>(false);
  public isEditIngr = new Subject<IIngredient | null>();

  constructor(
    private _calculatorService: CalculatorService,
    private _authService: AuthService,
  ) {}

  get ingredients() {
    return JSON.parse(JSON.stringify(this._ingredients));
  }

  public setIngredients(ingr: IIngredient[]) {
    this._ingredients = ingr;
    this.isIngredientChange.next(this.ingredients);
  }

  public editIngredient(ingr: IIngredient) {
    this.isEditMode.next(true);
    this.isEditIngr.next(ingr);
  }

  public addIngredient(ingr: IIngredient) {
    const ingrForSave = { ...ingr, id: this._randomString(), authorID: this._authService.user.getValue().id } ;

    this._ingredients.push(ingrForSave);
    this.isIngredientChange.next(this.ingredients);
  }

  public saveChangedIngredient(newIngr: IIngredient) {
    this.isEditMode.next(false);
    this.isEditIngr.next(null);
    const id = this._ingredients.findIndex((item) => item.id === newIngr.id);

    if (id === -1) return;
    else {
      this._ingredients[id] = newIngr;
      this.isIngredientChange.next(this.ingredients);
      this._calculatorService.updateIngredients(this.ingredients, this._calculatorService.ingredients);
    }
  }

  public cancelChangedIngredient() {
    this.isEditMode.next(false);
    this.isEditIngr.next(null);
    this.isIngredientChange.next(this.ingredients);
  }

  public deleteIngredient(ingr: IIngredient) {
    const id = this._ingredients.findIndex((item) => item.id === ingr.id);

    this._ingredients.splice(id, 1);
    this.isIngredientChange.next(this.ingredients);
  }

  private _randomString() {
    return String(
      Date.now().toString(32) +
        Math.random().toString(16)
    ).replace(/\./g, '')
  }
}
