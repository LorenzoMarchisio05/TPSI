export enum RecipeDifficulty {
    easy = 0,
    medium = 1,
    hard = 2,
    master = 3,
};

const recipeDifficultyArray: string[] = Object.keys(RecipeDifficulty).filter((item) => isNaN(Number(item)));

const createNameValueMap = () => {
    const map: any = {};

    recipeDifficultyArray.forEach((name, i) => {
        map[name] = i;
    });

    return map;
}

export const RecipeDifficultyMap = createNameValueMap();

export const GetRecipeDifficultyName = (difficulty: RecipeDifficulty): string => recipeDifficultyArray[difficulty];

export const GetRecipeDifficultyNames = () => recipeDifficultyArray;