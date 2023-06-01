import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CalculatorComponent } from "./calculator/calculator.component";

const routes: Route[] = [
 { path: 'calculator' , component: CalculatorComponent }
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
