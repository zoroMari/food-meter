import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { NewIngredientsModule } from "../shared/components/new-ingredient/new-ingredient.module";
import { SelectIngredientModule } from "../shared/components/select-ingredient/select-ingredient.module";
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
