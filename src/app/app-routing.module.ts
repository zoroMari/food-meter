import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { IngredientsComponent } from "./ingredients/ingredients.component";

const routes: Route[] = [
  { path: 'calculator' , loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule)},
  { path: 'ingredients' , loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule)},
  { path: 'about' , loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
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
