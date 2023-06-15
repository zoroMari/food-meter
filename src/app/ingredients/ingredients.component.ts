import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IIngredient } from 'src/app/ingredients/ingredients.model';
import { NewIngredientComponent } from './new-ingredient/new-ingredient.component';
import { validateNo } from '../shared/help-function';
import { IngredientsService } from './ingredients.service';
import { IngredientStoreService } from './ingredients.store.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.sass']
})
export class IngredientsComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'gram', 'ccal', 'protein', 'carbon', 'fat', 'edit', 'delete', 'save', 'cancel'];
  public dataSource!: IIngredient[];
  public animal!: string;
  public name!: string;
  public isEditMode!: boolean;
  public editIngrId: string | null = null;

  private _isAuthorized!: boolean;
  private _sub!: Subscription;

  constructor(
    private _ingrService: IngredientsService,
    private _ingredientStoreService: IngredientStoreService,
    public dialog: MatDialog,
    private _AuthService: AuthService,
  ) { }

  ngOnInit(): void {
    this._ingredientStoreService.fetchIngredients();

    this._sub = this._ingrService.isEditMode.subscribe(
      (value) => {
        this.isEditMode = value
      }
    )

    this._sub.add(this._AuthService.user.subscribe(
      (user: User) => this._isAuthorized = !!user
    ));

    this._sub.add(this._ingrService.isEditIngr.subscribe(
      (value) => {
        if (!value) this.editIngrId = null;
        else this.editIngrId = value.id
      }
    ))

    this._sub.add(this._ingredientStoreService.fetchIngredients().subscribe(
      (responseData) => {}
    ))

    this._sub.add(this._ingrService.isIngredientChange.subscribe(
      (ingr) => {
        this.dataSource = ingr;

      }
    ))
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public handleEditIngredient(ingr: IIngredient): void {
    if (this.isEditMode) return;
    this._ingrService.editIngredient(ingr);
  }

  public handleSaveChanges(ingr: IIngredient): void {
    this._ingrService.saveChangedIngredient(ingr);
    this._ingredientStoreService.storeIngredients();
    this._ingredientStoreService.fetchIngredients();
  }

  public handleCancelChanges(): void {
    this._ingrService.cancelChangedIngredient();
    this._ingredientStoreService.fetchIngredients();
  }

  public handleDeleteIngredient(ingr: IIngredient): void {

    this._ingrService.deleteIngredient(ingr);
    this._ingredientStoreService.storeIngredients();
    this._ingredientStoreService.fetchIngredients();
  }

  public handleValidateNumber(event: any) {
    validateNo(event);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(NewIngredientComponent, {
      width: '250px',
      data: { checkbox: false, calculator: false, isAuth: this._isAuthorized },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
