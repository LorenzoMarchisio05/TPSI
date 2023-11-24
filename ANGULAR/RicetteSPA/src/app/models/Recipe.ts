import { RecipeDifficulty, GetRecipeDifficultyName } from "./RecipeDifficultyEnum";
import { RecipeIngredient } from "./RecipeIngredient";

export class Recipe {
    public static readonly Empty: Recipe = new Recipe(
        -1, 
        "Empty", 
        "",
        [], 
        [], 
        0, 
        RecipeDifficulty.easy, 
        "../../assets/images/empty-dish.jpg"
        );

    Id: number;
    Name: string;
    Description: string;
    Ingredients: RecipeIngredient[];
    Instructions: string[];
    ExecutionTime: number;
    Difficulty: RecipeDifficulty;
    UrlImage: string;

    constructor(
        id: number,
        name: string, 
        description: string, 
        ingredients: RecipeIngredient[], 
        instructions: string[], 
        executionTime: number, 
        difficulty: number, 
        urlImage: string
        ) {
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.Ingredients = ingredients;
            this.Instructions = instructions;
            this.ExecutionTime = executionTime;
            this.Difficulty = difficulty;
            this.UrlImage = urlImage;
    }

    public toString(): string {
        const id = this.Id
        const name = this.Name;
        const description = this.Description;
        const ingredients = this.Ingredients;
        const instructions = this.Instructions;
        const executionTime = this.ExecutionTime;
        const difficulty = this.Difficulty;
        const urlImage = this.UrlImage;

        return ({
            id,
            name, 
            description, 
            ingredients, 
            instructions, 
            executionTime, 
            difficulty, 
            urlImage,
        }).toString();
    }

    GetDifficultyString(): string {
        return GetRecipeDifficultyName(this.Difficulty);
    }
}