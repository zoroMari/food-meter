import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IIngredient } from "src/app/shared/ingredients.model";
import { IngredientsService } from "../ingredients/ingredients.service";
import { validateNo } from "../shared/help-function";

@Component({
  selector: 'app-new-ingredient',
  templateUrl: 'new-ingredient.component.html',
  styleUrls: ['new-ingredient.component.sass'],
})
export class NewIngredientComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private _ingredientsService: IngredientsService,
    public dialogRef: MatDialogRef<NewIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IIngredient,
  ) {}

    ngOnInit(): void {
      this._formInitialization();
    }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public handleSaveIngredient(): void {
    this._ingredientsService.addIngredient(this.form.value);
  }

  private _formInitialization() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      gram: new FormControl('100', [Validators.required]),
      ccal: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      protein: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      carbon: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      fat: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    })
  }
}
