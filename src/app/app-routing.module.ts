import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AboutComponent } from "./about /about.component";
import { CalculatorComponent } from "./calculator/calculator.component";
import { IngredientsComponent } from "./ingredients/ingredients.component";

const routes: Route[] = [
  { path: 'calculator' , component: CalculatorComponent },
  { path: 'ingredients' , component: IngredientsComponent },
  { path: 'about' , component: AboutComponent },
  { path: '' , redirectTo: 'calculator', pathMatch: 'full' },
]


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {

}
