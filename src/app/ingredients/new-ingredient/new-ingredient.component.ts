import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientStoreService } from "src/app/ingredients/ingredients.store.service";
import { IIngredient } from "src/app/ingredients/ingredients.model";
import { CalculatorService } from "../../calculator/calculator.service";
import { IngredientsService } from "../ingredients.service";

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
  public addIngr = new FormControl('true', [Validators.required]);

  constructor(
    private _ingrService: IngredientsService,
    private _ingrStoreService: IngredientStoreService,
    private _calculatorService: CalculatorService,
    public dialogRef: MatDialogRef<NewIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { checkbox: boolean, calculator: boolean, isAuth: boolean },
  ) {}

    ngOnInit(): void {
      this._formInitialization();
    }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public handleSaveIngredient(): void {
    const ingrForSaving: IIngredient = {
      name: this.form.controls['name'].value,
      gram: this.form.controls['gram'].value,
      ccal: +Number(this.form.controls['ccal'].value).toFixed(2),
      protein: +Number(this.form.controls['protein'].value).toFixed(2),
      carbon: +Number(this.form.controls['carbon'].value).toFixed(2),
      fat: +Number(this.form.controls['fat'].value).toFixed(2),
      id: null,
      authorID: null,
    }

    if (this.data.calculator) this._calculatorService.addIngredient(ingrForSaving);

    if (!this.addIngr.value) return;
    else {
      this._ingrService.addIngredient(ingrForSaving);
      this._ingrStoreService.storeIngredients();
    }
  }

  private _formInitialization() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      gram: new FormControl('100', [Validators.required]),
      ccal: new FormControl('', [Validators.required]),
      protein: new FormControl('', [Validators.required]),
      carbon: new FormControl('', [Validators.required]),
      fat: new FormControl('', [Validators.required]),
    })
  }
}

