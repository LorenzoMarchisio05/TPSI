let recipes = [
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

class RecipeController
{
    #mapRecipeToRecipeHeaders(recipe) {
        const{ Id, Name, ExecutionTime, Difficulty, Ingredients, UrlImage } = recipe
        return { Id, Name, ExecutionTime, Difficulty, Ingredients, UrlImage};
    };

    #GetInsertedRecipeId() {
        if(recipes.length === 0) {
            return 0;
        }
        return recipes.reduce((prev, current) => prev.Id > current.Id ? prev : current).Id + 1;
    }

    GetRecipes() {
        return recipes;
    }

    GetRecipe(id) {
        try {
            const recipe = recipes.find(recipe => recipe.Id == id);

            if(!recipe) {
                console.error('recipe not found');
                return {
                    success: false,
                    value: null,
                    message: 'recipe not found',
                    statusCode: 404,
                }
            }

            return {
                success: true,
                value: recipe,
                message: "",
                statusCode: 200,
            }
        }
        catch(err) {
            console.error(err);
            return {
                success: false,
                value: null,
                message: message,
                statusCode: code,
            }
        }
    }

    GetRecipeHeaders() {  
        try {
            return {
                success: true,
                value: recipes.map(this.#mapRecipeToRecipeHeaders),
                message: "",
                statusCode: 200,
            }
        }
        catch(err) {
            console.error(err);
            return {
                success: false,
                value: null,
                message: err.message || err,
                statusCode: err.code || 500,
            }
        }
    };

    CreateRecipe(recipe) {
        try {
            const { Description, Difficulty, ExecutionTime, Name, UrlImage } = recipe;
            const Ingredients = recipe.Ingredients.join(',');
            const Instructions = recipe.Instructions.join(',');

            if(recipes.some(r => (
                    r.Description === Description &&
                    r.Difficulty === Difficulty &&
                    r.ExecutionTime === ExecutionTime &&
                    r.Ingredients.join(',') ===  Ingredients &&
                    r.Instructions.join(',') ===  Instructions && 
                    r.Name === Name &&
                    r.UrlImage === UrlImage
                ))) {
                    return {
                        success: false,
                        value: null,
                        message: "Exisxts already a recipe with the same data",
                        statusCode: 409,
                    }
                }

            recipe.Id = this.#GetInsertedRecipeId();
            recipes.push(recipe);
    
            return {
                success: true,
                value: recipe.Id,
                message: "",
                statusCode: 201,
            }
        }
        catch(err) {
            console.error(err);
            return {
                success: false,
                value: null,
                message: err.message || err,
                statusCode: err.code || 500,
            }
        }
    }

    DeleteRecipe(id) {
        try {
            if(recipes.findIndex(recipe => recipe.Id == id) === -1) {
                console.error(`No recipe found with id '${id}'`,);
                return {
                    success: false,
                    value: null,
                    message: `No recipe found with id '${id}'`,
                    statusCode: 404,
                }
            }

            recipes = recipes.filter(recipe => recipe.Id != id);

            return {
                success: true,
                value: id,
                message: "",
                statusCode: 200,
            }
        }
        catch(err) {
            console.error(err);
            return {
                success: false,
                value: null,
                message: err.message || err,
                statusCode: err.code || 500,
            }
        }
        
    }

    UpdateRecipe(recipe) {
        try {    
            const oldRecipeIndex = recipes.findIndex(r => r.Id == recipe.Id);
            
            if(oldRecipeIndex === -1) {
                console.error(`No recipe found with id '${recipe.Id}'`);
                return {
                    success: false,
                    value: null,
                    message: `No recipe found with id '${recipe.Id}'`,
                    statusCode: 404,
                }
            }
        
            recipes[oldRecipeIndex] = {
                ...recipes[oldRecipeIndex],
                ...recipe,
            };
        
            return {
                success: true,
                value: recipe.Id,
                message: "",
                statusCode: 200,
            }
        }
        catch(err) {
            console.error(err);
            return {
                success: false,
                value: null,
                message: err.message || err,
                statusCode: err.code || 500,
            }
        }
    }
}

export const recipeController = new RecipeController();
