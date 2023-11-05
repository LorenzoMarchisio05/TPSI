export enum RecipeDifficulty {
    easy = 0,
    medium = 1,
    hard = 2,
    master = 3,
};

const RecipeDifficultyMap: string[] = Object.keys(RecipeDifficulty).filter((item) => isNaN(Number(item)));

export const GetRecipeDifficultyName = (difficulty: RecipeDifficulty): string => RecipeDifficultyMap[difficulty];