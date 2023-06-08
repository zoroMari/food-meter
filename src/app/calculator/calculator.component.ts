import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IIngredient } from "src/app/shared/ingredients.model";
import { IngredientsService } from "../ingredients/ingredients.service";
import { NewIngredientComponent } from "../new-ingredient/new-ingredient.component";
import { CalculatorService } from "./calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass'],
})
export class CalculatorComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'gram', 'ccal', 'protein', 'carbon', 'fat', 'delete'];
  public dataSource!: IIngredient[];

  constructor(
    private _calculatorService: CalculatorService,
    private _ingredientService: IngredientsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._calculatorService.changeTotalData();

    this._calculatorService.total.subscribe(
      (value) => {
        this.dataSource = [value, ...this._calculatorService.ingredients];
      }
    )

    this._calculatorService.ingredientsChange.subscribe(
      (value) => {
        this.dataSource = [this._calculatorService.total.getValue(), ...this._calculatorService.ingredients];
      }
    )
  }

  public openDialog() {
    const dialogRef = this.dialog.open(NewIngredientComponent, {
      width: '250px',
      data: { checkbox: true, calculator: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('this. >>>', this._ingredientService.ingredients);
    });
  }

  public handleChangeWeight(ingredient: IIngredient): void {
    this._calculatorService.changeIngredientData(ingredient);
  }

  public handleDelIngr(ing: IIngredient): void {
    this._calculatorService.deleteIngr(ing);
  }

  public getTooltipInfo(ingr: IIngredient): string {
    const ingrPer100 = this._calculatorService.ingredientsPer100.find((item) => item.name === ingr.name);
    if (!ingrPer100) return '';
    return `
        ${ingrPer100.name} (100 gr):
        ${ingrPer100.ccal} ccal,
        ${ingrPer100.protein} pr,
        ${ingrPer100.carbon} carb,
        ${ingrPer100.fat} fat
      `
  }
}


