import { Recipe } from "./Recipe";
import { RecipeDifficulty, GetRecipeDifficultyName } from "./RecipeDifficultyEnum";
import { RecipeIngredient } from "./RecipeIngredient";

export class RecipeHeader {
    static Empty: RecipeHeader = new RecipeHeader(
        Recipe.Empty.Id, 
        Recipe.Empty.Name, 
        Recipe.Empty.ExecutionTime, 
        Recipe.Empty.Difficulty, 
        Recipe.Empty.Ingredients, 
        Recipe.Empty.UrlImage);

    Id: number;
    Name: string;
    ExecutionTime: number;
    Difficulty: RecipeDifficulty;
    Ingredients: RecipeIngredient[];
    UrlImage: string;


    constructor(id:number, name: string, executionTime: number, difficulty: number, recipeIngredients: RecipeIngredient[], urlImage: string) {
        this.Id = id;
        this.Name = name;
        this.ExecutionTime = executionTime;
        this.Difficulty = difficulty;
        this.Ingredients = recipeIngredients;
        this.UrlImage = urlImage;
    }

    static GetHeaders(): string[] {
        return Object.getOwnPropertyNames(RecipeHeader.Empty)
            .filter(prop => prop !== "Id" && prop !== "Ingredients")
            .map(header => header.replace(/([A-Z])/g, ' $1'));
    }

    GetDifficultyString(): string {
        return GetRecipeDifficultyName(this.Difficulty);
    }
}