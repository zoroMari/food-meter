import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectIngredientComponent } from "./select-ingredient.componet";


@NgModule({
  declarations: [
    SelectIngredientComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    SelectIngredientComponent,
  ],
})
export class SelectIngredientModule {

}


