import express from 'express';

const recipes = [
  {
    "Id": 1,
    "Name": "Pumpkin soup",
    "Description":  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit pariatur neque iure modi, ducimus dignissimos iusto dolorum dolores quia reiciendis odit, doloremque explicabo aliquid veniam!",
    "Ingredients": [
      "2 Lorem ipsum dolor sit amet ", 
      "1 consectetur adipisicing elit. ", 
      "1 Sit pariatur neque iure modi" , 
      "2 ducimus dignissimos iusto dolorum dolores", 
      "4 quia reiciendis odit", 
      "1 doloremque explicabo aliquid veniam!"
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
      "2 Lorem ipsum dolor sit amet ", 
      "1 consectetur adipisicing elit. ", 
      "1 Sit pariatur neque iure modi" , 
      "2 ducimus dignissimos iusto dolorum dolores", 
      "4 quia reiciendis odit", 
      "1 doloremque explicabo aliquid veniam!"
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
  const{ Id, Name, ExecutionTime, Difficulty } = recipe

  return { Id, Name, ExecutionTime, Difficulty, };
};

const recipeHeaders = recipes.map(mapRecipeToRecipeHeaders);

const error = {
  message: ""
};

console.log(recipes.length, recipeHeaders.length);

const app = express();
const port = 3000;

const setHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.setHeader("Content-Type", "application/json");
}

app.get("/", (req, res) => {
  res.redirect("/recipes");
});

app.get("/recipes/", (req, res) => {
  setHeaders(res);

  res.send(JSON.stringify(recipes));
});

app.get("/recipes/:id/", (req, res) => {
  setHeaders(res);

  const id = req.params.id;
  const recipe = recipes.find(recipe => recipe.Id == id);

  if(!recipe) {
    error.message = `No recipe found with id '${id}'`;

    res.status(404)
      .send(JSON.stringify(error));
    return;
  }

  res.send(JSON.stringify(recipe));
});

app.post("/recipes/", (req, res) => {
  setHeaders(res);

  const contentType = req.headers['content-type'];
  if(contentType !== "application/json") {
    error.message = `Content type must be 'application/json'`;

    res.status(404)
      .send(JSON.stringify(error));
    return;
  }

  const recipe = JSON.parse(req.body);

  if(!recipe) {
    error.message = `Recipe is empty`;

    res.status(404)
      .send(JSON.stringify(error));
    return;
  }

  recipes.push(recipe);
  recipeHeaders.push(mapRecipeToRecipeHeaders(recipe));
});

app.delete("/recipes/:id/", (req, res) => {
  setHeaders(res);

  const id = req.params.id;

  recipes.pop({ Id: id });
  recipeHeaders.pop({ Id: id });
});

app.get("/headers/", (req, res) => {
  setHeaders(res);

  res.send(JSON.stringify(recipeHeaders));
})


app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});