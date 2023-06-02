import { Component, OnInit } from '@angular/core';
import { IIngredient } from 'src/ingredients.model';
import { IngredientsService } from './ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.sass']
})
export class IngredientsComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'gram', 'ccal', 'protein', 'carbon', 'fat', 'edit', 'delete', 'save', 'cancel'];
  public dataSource!: IIngredient[];


  public isEditMode!: boolean;

  constructor(
    private _ingrService: IngredientsService,
  ) { }

  ngOnInit(): void {
    this._ingrService.isEditMode.subscribe(
      (value) => this.isEditMode = value
    )

    this._ingrService.ingredientsChange.subscribe(
      (value: IIngredient[]) => this.dataSource = value
    )
  }

  handleEditIngredient(ingr: IIngredient) {
    this._ingrService.editIngredient(ingr);
  }

  handleSaveChanges(ingr: IIngredient) {
    this._ingrService.saveChangedIngredient(ingr);
  }

  handleCancelChanges() {
    this._ingrService.cancelChangedIngredient();
  }

  handleDeleteIngredient(ingr: IIngredient) {
    this._ingrService.deleteIngredient(ingr);
  }

}
