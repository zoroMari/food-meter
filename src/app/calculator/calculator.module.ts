import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { CalculatorComponent } from "./calculator.component";

@NgModule({
  declarations: [
    CalculatorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CalculatorComponent }])
  ],
  exports: [
    RouterModule,
  ],
})
export class CalculatorModule {

}
