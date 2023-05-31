import { Component } from "@angular/core";
import { IIngredient } from "src/ingredients.model";


const ELEMENT_DATA: IIngredient[] = [
  { name: 'TOTAL:', gramm: 0, ccal: 10, protein: 20, carbon: 30, fat: 40 },

  { name: 'Egg', gramm: 0, ccal: 10, protein: 20, carbon: 30, fat: 40 },
  { name: 'Chicken',  gramm: 0, ccal: 10, protein: 20, carbon: 30, fat: 40 },
  { name: 'Salmon', gramm: 0,  ccal: 10, protein: 20, carbon: 30, fat: 40 },
  { name: 'Bread',  gramm: 0, ccal: 10, protein: 20, carbon: 30, fat: 40 },
];

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass'],
})
export class CalculatorComponent {
  displayedColumns: string[] = ['name', 'gramm', 'ccal', 'protein', 'carbon', 'fat'];
  dataSource = ELEMENT_DATA;
}


