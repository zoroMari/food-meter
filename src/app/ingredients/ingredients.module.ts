import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { IngredientsComponent } from "./ingredients.component";

@NgModule({
  declarations: [
    IngredientsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: IngredientsComponent }])
  ],
  exports: [
    RouterModule,
  ],
})
export class IngredientsModule {

}
