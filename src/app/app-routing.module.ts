import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [
  { path: 'calculator' , loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule)},
  { path: 'ingredients' , loadChildren: () => import('./ingredients/ingredients.module').then(m => m.IngredientsModule)},
  { path: 'about' , loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  { path: 'login' , loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
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
