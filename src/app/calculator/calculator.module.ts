import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { NewIngredientsModule } from "../ingredients/new-ingredient/new-ingredient.module";
import { SelectIngredientModule } from "../ingredients/select-ingredient/select-ingredient.module";
import { CalculatorComponent } from "./calculator.component";

@NgModule({
  declarations: [
    CalculatorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NewIngredientsModule,
    SelectIngredientModule,
    RouterModule.forChild([{ path: '', component: CalculatorComponent }])
  ],
  exports: [
    RouterModule,
  ],
})
export class CalculatorModule {

}
