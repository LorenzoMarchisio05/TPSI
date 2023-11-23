import { RecipeDifficulty, GetRecipeDifficultyName } from "./RecipeDifficultyEnum";
import { RecipeIngredient } from "./RecipeIngredient";

export class RecipeHeader {
    static Empty: RecipeHeader = new RecipeHeader(-1, "", -1, 0, [], "");

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