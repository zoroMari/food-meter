import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { IIngredient, IIngredientTotal } from "src/app/ingredients/ingredients.model";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { IngredientStoreService } from "../ingredients/ingredients.store.service";
import { NewIngredientComponent } from "../ingredients/new-ingredient/new-ingredient.component";
import { SelectIngredientComponent } from "../ingredients/select-ingredient/select-ingredient.componet";
import { CalculatorService } from "./calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass'],
})
export class CalculatorComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'gram', 'ccal', 'protein', 'carbon', 'fat', 'delete'];
  public dataSource!: IIngredient[] | IIngredientTotal[];
  public isAuthorized!: boolean;
  private _sub!: Subscription;

  constructor(
    private _calculatorService: CalculatorService,
    private _ingredientStoreService: IngredientStoreService,
    private _AuthService: AuthService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._sub = this._AuthService.user.subscribe(
      (user: User) => this.isAuthorized = !!user
    );

    this._sub.add(this._ingredientStoreService.fetchIngredients().subscribe(
      (value) => {}
    ));

    this._calculatorService.ingredientsChange.subscribe(
      (value) => {
        this._calculatorService.ingredients = value;
        this.dataSource = [this._calculatorService.total.getValue(), ...value];
      }
    );

    this._calculatorService.changeTotalData();

    this._sub.add(this._calculatorService.total.subscribe(
      (value) => {
        this.dataSource = [value, ...this._calculatorService.ingredients];
      }
    ));
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public openDialogNewIngr() {
    const dialogRef = this.dialog.open(NewIngredientComponent, {
      width: '250px',
      data: { checkbox: true, calculator: true, isAuth: this.isAuthorized }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public openDialogSelectIngr() {
    const dialogRef = this.dialog.open(SelectIngredientComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public handleChangeWeight(ingredient: IIngredient): void {
    this._calculatorService.changeIngredientData(ingredient);
  }

  public handleDelIngr(ing: IIngredient): void {
    this._calculatorService.deleteIngr(ing);
  }

  public handleClearCalculator(): void {
    this._calculatorService.deleteAllIngr();
  }

  public getTooltipInfo(ingr: IIngredient): string {
    const ingrPer100: IIngredient | undefined = this._calculatorService.ingredientsPer100.find((item) => item.name === ingr.name);
    if (!ingrPer100) return this._tooltipTemplate(ingr);
    return this._tooltipTemplate(ingrPer100);
  }

  private _tooltipTemplate(ingr: IIngredient) {
    return `
    ${ingr.name} (100 gr):
    ${ingr.ccal} ccal,
    ${ingr.protein} pr,
    ${ingr.carbon} carb,
    ${ingr.fat} fat
  `
  }


}


