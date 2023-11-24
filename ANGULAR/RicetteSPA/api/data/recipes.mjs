export let recipes = [
    {
        Id: 1,
        Name: "Pumpkin soup",
        Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit pariatur neque iure modi, ducimus dignissimos iusto dolorum dolores quia reiciendis odit, doloremque explicabo aliquid veniam!",
        Ingredients: [
        {
            quantity: 100,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 40,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 26,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 150,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 18,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        ],
        Instructions: [
            "Lorem ipsum dolor sit amet ",
            "consectetur adipisicing elit. ",
            "Sit pariatur neque iure modi",
            "ducimus dignissimos iusto dolorum dolores",
            "quia reiciendis odit",
            "doloremque explicabo aliquid veniam!",
        ],
        ExecutionTime: 15,
        Difficulty: 1,
        UrlImage: "https://food-images.files.bbci.co.uk/food/recipes/pumpkinsoup_89904_16x9.jpg",
    },
    {
        Id: 2,
        Name: "Pumpkin pie",
        Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit pariatur neque iure modi, ducimus dignissimos iusto dolorum dolores quia reiciendis odit, doloremque explicabo aliquid veniam!",
        Ingredients: [
        {
            quantity: 100,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 40,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 26,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 150,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        {
            quantity: 18,
            measure: "gr",
            name: "Lorem ipsum dolor sit amet",
        },
        ],
        Instructions: [
            "pumpkin pie instructions 1",
            "pumpkin pie instructions 2",
            "pumpkin pie instructions 3",
            "pumpkin pie instructions 4",
            "pumpkin pie instructions 5",
            "pumpkin pie instructions 6",
        ],
        ExecutionTime: 25,
        Difficulty: 2,
        UrlImage: "https://www.giallozafferano.it/images/226-22603/Pumpkin-pie_650x433_wm.jpg",
    },
];

const mapRecipeToRecipeHeaders = (recipe) => {
    const{ Id, Name, ExecutionTime, Difficulty, Ingredients, UrlImage } = recipe
    return { Id, Name, ExecutionTime, Difficulty, Ingredients, UrlImage};
};

export function getInsertedRecipeId() {
    return recipes.reduce((prev, current) => prev.Id > current.Id ? prev : current).Id + 1;
}

export let recipeHeaders = recipes.map(mapRecipeToRecipeHeaders);