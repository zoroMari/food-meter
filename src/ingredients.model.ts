
export interface IIngredient {
  name: string;
  gram: number;
  ccal: number;
  protein: number;
  carbon: number;
  fat: number;
}

export class IngredientModel {
  constructor(
    public name: string,
  ) {

  }
}
