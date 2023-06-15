
export interface IIngredient {
  name: string;
  gram: number;
  ccal: number;
  protein: number;
  carbon: number;
  fat: number;
  id: string;
  authorID: string;
}

export interface IIngredientInCalc {
  name: string;
  id: string;
  authorID: string;
  gram: number;
  actualWeight: number;
  ccal: number;
  ccalPer100: number;
  protein: number;
  proteinPer100: number;
  carbon: number;
  carbonPer100: number;
  fat: number;
  fatPer100: number;
}
export interface IIngredientTotal {
  name: string;
  // gram: number;
  actualWeight: number;
  ccal: number;
  protein: number;
  carbon: number;
  fat: number;
}
