
export interface IIngredient {
  name: string;
  gramm: number;
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
