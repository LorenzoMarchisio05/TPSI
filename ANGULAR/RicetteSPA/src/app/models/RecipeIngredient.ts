export type RecipeIngredient = {
    quantity: number,
    measure: string,
    name: string,
};

export function MapStringToIngredient(str: string): RecipeIngredient {
    const quantityMatch = str.match(/\d+(?=\s|$)/) || [ '0' ];
    const quantity = parseInt(quantityMatch[0]);
    const measureOffset = quantityMatch!.index! + quantityMatch![0].length;

    const meausureMatch = str.substring(measureOffset).match(/\w+(?=\s|$)/) || [ '' ];
    const measure = meausureMatch![0].trim();
    const nameOffset = measureOffset + meausureMatch!.index! + meausureMatch![0].length;

    const name = str.substring(nameOffset).trim();

    if(quantity === 0 || measure === '' || name === '') {
        throw new Error("Invalid ingredient format");
    }

    return { quantity, measure, name } as RecipeIngredient;
}