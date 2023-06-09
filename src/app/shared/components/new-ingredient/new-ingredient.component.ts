import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IIngredient } from "src/app/shared/ingredients.model";
import { CalculatorService } from "../../../calculator/calculator.service";
import { IngredientsService } from "../../../ingredients/ingredients.service";

interface IData extends IIngredient {
  saveIngr: boolean;
}

@Component({
  selector: 'app-new-ingredient',
  templateUrl: 'new-ingredient.component.html',
  styleUrls: ['new-ingredient.component.sass'],
})
export class NewIngredientComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private _ingredientsService: IngredientsService,
    private _calculatorService: CalculatorService,
    public dialogRef: MatDialogRef<NewIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { checkbox: boolean, calculator: boolean },
  ) {}

    ngOnInit(): void {
      this._formInitialization();
    }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public handleSaveIngredient(): void {
    if (this.data.calculator) this._calculatorService.addIngredient(this.form.value);

    if (!this.form.controls['addIngr'].value) return;
    else this._ingredientsService.addIngredient(this.form.value);
  }

  private _formInitialization() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      gram: new FormControl('100', [Validators.required]),
      ccal: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      protein: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      carbon: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      fat: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      addIngr: new FormControl('true', [Validators.required]),
    })
  }
}
