import { RecipeDifficulty } from "./RecipeDifficultyEnum";

export class RecipeHeader {
    Name: string;
    ExecutionTime: number;
    Difficulty: RecipeDifficulty;


    constructor(name: string, executionTime: number, difficulty: number) {
        this.Name = name;
        this.ExecutionTime = executionTime;
        this.Difficulty = difficulty;
    }
}