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
    const ingrForSave = { ...ingr, authorID: this._authService.user.getValue().id } ;

    this._ingredients.push(ingrForSave);
    this.isIngredientChange.next(this.ingredients);
  }

  public saveChangedIngredient(newIngr: IIngredient) {
    this.isEditMode.next(false);
    this.isEditIngr.next(null);
    const id = this._ingredients.findIndex((item) => item.id === newIngr.id);

    if (id === -1) return;
    else {
      const ingrForSave = this.fixedValueInIngr(newIngr);
      this._ingredients[id] = ingrForSave;
      this.isIngredientChange.next(this.ingredients);
      this._calculatorService.updateIngredientsPer100Info(ingrForSave, this._calculatorService.ingredients);
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

  public fixedValueInIngr(ingr: IIngredient) {
    const id = ingr.id ? ingr.id : null;
    const author = ingr.authorID ? ingr.authorID : null;

    return {
      name: ingr.name,
      gram: ingr.gram,
      ccal: +ingr.ccal.toFixed(2),
      protein: +ingr.protein.toFixed(2),
      carbon: +ingr.carbon.toFixed(2),
      fat: +ingr.fat.toFixed(2),
      id: id,
      authorID: author,
    }
  }
}
