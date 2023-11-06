import { RecipeDifficulty, GetRecipeDifficultyName } from "./RecipeDifficultyEnum";

export class RecipeHeader {
    static Empty: RecipeHeader = new RecipeHeader(-1, "", -1, 0);

    Id: number;
    Name: string;
    ExecutionTime: number;
    Difficulty: RecipeDifficulty;


    constructor(id:number, name: string, executionTime: number, difficulty: number) {
        this.Id = id;
        this.Name = name;
        this.ExecutionTime = executionTime;
        this.Difficulty = difficulty;
    }

    static GetHeaders(): string[] {
        return Object.getOwnPropertyNames(RecipeHeader.Empty)
            .filter(prop => prop !== "Id")
            .map(header => header.replace(/([A-Z])/g, ' $1'));
    }

    GetDifficultyString(): string {
        return GetRecipeDifficultyName(this.Difficulty);
    }
}