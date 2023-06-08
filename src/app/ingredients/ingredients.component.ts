import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IIngredient } from 'src/app/shared/ingredients.model';
import { NewIngredientComponent } from '../new-ingredient/new-ingredient.component';
import { validateNo } from '../shared/help-function';
import { IngredientsService } from './ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.sass']
})
export class IngredientsComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'gram', 'ccal', 'protein', 'carbon', 'fat', 'edit', 'delete', 'save', 'cancel'];
  public dataSource!: IIngredient[];
  public animal!: string;
  public name!: string;

  public isEditMode!: boolean;

  constructor(
    private _ingrService: IngredientsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._ingrService.isEditMode.subscribe(
      (value) => this.isEditMode = value
    )

    this._ingrService.ingredientsChange.subscribe(
      (value: IIngredient[]) => this.dataSource = value
    )
  }

  public handleEditIngredient(ingr: IIngredient): void {
    this._ingrService.editIngredient(ingr);
  }

  public handleSaveChanges(ingr: IIngredient): void {
    this._ingrService.saveChangedIngredient(ingr);
  }

  public handleCancelChanges(): void {
    this._ingrService.cancelChangedIngredient();
  }

  public handleDeleteIngredient(ingr: IIngredient): void {
    this._ingrService.deleteIngredient(ingr);
  }

  public handleValidateNumber(event: any) {
    validateNo(event);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(NewIngredientComponent, {
      width: '250px',
      data: {checkbox: false },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
