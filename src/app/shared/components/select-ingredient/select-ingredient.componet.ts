import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {MatDialogRef} from '@angular/material/dialog';
import { CalculatorService } from "src/app/calculator/calculator.service";
import { IngredientsService } from "src/app/ingredients/ingredients.service";
import { IIngredient } from "../../ingredients.model";

@Component({
  selector: 'app-select-ingredient',
  templateUrl: 'select-ingredient.componet.html',
  styleUrls: ['select-ingredient.componet.sass'],
})
export class SelectIngredientComponent implements OnInit {
  public form = new FormGroup({
    ingredients: new FormControl<IIngredient[] | null>(null),
  });
  public ingrList: IIngredient[] = [];

  constructor(
    public dialogRef: MatDialogRef<SelectIngredientComponent>,
    private _ingredientsService: IngredientsService,
    private _calculatorService: CalculatorService,
  ) {}

  ngOnInit(): void {
    this.ingrList = this._ingredientsService.ingredients;

    this._ingredientsService.ingredientsChange.subscribe(
      (value: IIngredient[]) => value
    )
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public handleSaveIngredient(): void {
    const value: IIngredient[] | null = this.form.controls['ingredients'].value;

    if (!value) return;
    else this._calculatorService.addIngredients(value);
    this.onNoClick();
  }
}
