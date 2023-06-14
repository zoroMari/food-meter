import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { LoadingSpinnerComponent } from "../shared/components/loading-spinner/loading-spinner.component";
import { LoadingSpinnerModule } from "../shared/components/loading-spinner/loading-spinner.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    LoadingSpinnerModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class AuthModule {

}
