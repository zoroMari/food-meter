import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  imports: [
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class MaterialModule {

}
