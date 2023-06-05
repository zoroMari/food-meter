import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { NewIngredientComponent } from "./new-ingredient.component";

@NgModule({
  declarations: [
    NewIngredientComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    NewIngredientComponent,
  ],
})
export class NewIngredientsModule {

}
