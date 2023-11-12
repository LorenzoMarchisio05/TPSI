import express from 'express';

let recipes = [
  {
    "Id": 1,
    "Name": "Pumpkin soup",
    "Description":  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit pariatur neque iure modi, ducimus dignissimos iusto dolorum dolores quia reiciendis odit, doloremque explicabo aliquid veniam!",
    "Ingredients": [
				{
					"quantity": 100,
					"measure": "gr",
					"name": "Lorem ipsum dolor sit amet"
				},
				{
					"quantity": 40,
					"measure": "gr",
					"name": "Lorem ipsum dolor sit amet"
				},
				{
					"quantity": 26,
					"measure": "gr",
					"name": "Lorem ipsum dolor sit amet"
				},
				{
					"quantity": 150,
					"measure": "gr",
					"name": "Lorem ipsum dolor sit amet"
				},
				{
					"quantity": 18,
					"measure": "gr",
					"name": "Lorem ipsum dolor sit amet"
				}
			],
    "Instructions": [
      "Lorem ipsum dolor sit amet ", 
      "consectetur adipisicing elit. ", 
      "Sit pariatur neque iure modi" , 
      "ducimus dignissimos iusto dolorum dolores", 
      "quia reiciendis odit", 
      "doloremque explicabo aliquid veniam!"
    ],
    "ExecutionTime": 15,
    "Difficulty": 1,
    "UrlImage": "https://food-images.files.bbci.co.uk/food/recipes/pumpkinsoup_89904_16x9.jpg"
  },
  {
    "Id": 2,
    "Name": "Pumpkin pie",
    "Description":  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit pariatur neque iure modi, ducimus dignissimos iusto dolorum dolores quia reiciendis odit, doloremque explicabo aliquid veniam!",
    "Ingredients": [
      {
        "quantity": 100,
        "measure": "gr",
        "name": "Lorem ipsum dolor sit amet"
      },
      {
        "quantity": 40,
        "measure": "gr",
        "name": "Lorem ipsum dolor sit amet"
      },
      {
        "quantity": 26,
        "measure": "gr",
        "name": "Lorem ipsum dolor sit amet"
      },
      {
        "quantity": 150,
        "measure": "gr",
        "name": "Lorem ipsum dolor sit amet"
      },
      {
        "quantity": 18,
        "measure": "gr",
        "name": "Lorem ipsum dolor sit amet"
      },
    ],
    "Instructions": [
      "pumpkin pie instructions 1",
      "pumpkin pie instructions 2",
      "pumpkin pie instructions 3",
      "pumpkin pie instructions 4",
      "pumpkin pie instructions 5",
      "pumpkin pie instructions 6",
    ],
    "ExecutionTime": 25,
    "Difficulty": 2,
    "UrlImage": "https://www.giallozafferano.it/images/226-22603/Pumpkin-pie_650x433_wm.jpg"
  },
];

const mapRecipeToRecipeHeaders = (recipe) => {
  const{ Id, Name, ExecutionTime, Difficulty, Ingredients } = recipe

  return { Id, Name, ExecutionTime, Difficulty, Ingredients, };
};

let recipeHeaders = recipes.map(mapRecipeToRecipeHeaders);

const error = {
  message: ""
};

const app = express();
const port = 3000;

const setHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.setHeader("Content-Type", "application/json");
}

const sendErrorMessage = (res, message, status = 404) => {
  error.message = message;

  res.status(status).send(JSON.stringify(error));
}

app.get("/", (req, res) => {
  res.redirect("/recipes");
});

app.get("/recipes/", (req, res) => {
  setHeaders(res);

  console.log("requested recipes");

  res.status(200).send(JSON.stringify(recipes));
});

app.get("/recipes/:id/", (req, res) => {
  setHeaders(res);

  const id = req.params.id;
  const recipe = recipes.find(recipe => recipe.Id == id);

  if(!recipe) {
    sendErrorMessage(res, `No recipe found with id '${id}'`, 404);
    return;
  }

  console.log("requested recipe id:" + id);

  res.status(200).send(JSON.stringify(recipe));
});

app.post("/recipes/", (req, res) => {
  setHeaders(res);

  const contentType = req.headers['content-type'];
  if(contentType !== "application/json") {
    sendErrorMessage(res, `Content type must be 'application/json'`, 415);
    return;
  }

  const recipe = JSON.parse(req.body);

  if(!recipe) {
    sendErrorMessage(res, `Recipe is empty`, 404);
    return;
  }

  recipes.push(recipe);
  recipeHeaders.push(mapRecipeToRecipeHeaders(recipe));

  console.log("created recipe id: " + recipe.id);

  res.status(201).send();
});

app.put("/recipes/:id/", (req, res) => {
  setHeaders(res);
  const id = req.params.id;

  const contentType = req.headers['content-type'];
  if(contentType !== "application/json") {
    sendErrorMessage(res, `Content type must be 'application/json'`, 415);
    return;
  }

  const oldRecipeIndex = recipes.findIndex(recipe => recipe.Id == id);

  if(oldRecipeIndex === -1) {
    sendErrorMessage(res, `No recipe found with id '${id}'`, 404);
    return;
  }

  const newRecipe = JSON.parse(req.body);

  recipes[oldRecipeIndex] = {
    ...recipes[oldRecipeIndex],
    ...newRecipe,
  };

  res.status(200).send();
})

app.delete("/recipes/:id/", (req, res) => {
  setHeaders(res);
  const id = req.params.id;

  if(recipes.findIndex(recipe => recipe.Id == id) === -1) {
    sendErrorMessage(res, `No recipe found with id '${id}'`, 404);
    return;
  }

  recipes = recipes.filter(recipe => recipe.Id != id);
  recipeHeaders = recipeHeaders.filter(recipeHeader => recipeHeader.Id != id);

  console.log("deleted recipe id: " + id);

  res.status(200).send();
});

app.get("/headers/", (req, res) => {
  setHeaders(res);

  console.log("requested recipes headers");

  res.status(200).send(JSON.stringify(recipeHeaders));
})


app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});