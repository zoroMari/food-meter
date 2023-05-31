import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  imports: [
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
  ]
})
export class MaterialModule {

}
