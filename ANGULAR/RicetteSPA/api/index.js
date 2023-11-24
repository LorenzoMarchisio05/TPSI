import express from 'express';
import bodyParser from 'body-parser';
import { recipes, recipeHeaders, getInsertedRecipeId} from './data/recipes.mjs';
import sendErrorMessage from './modules/error.mjs';

const app = express();
const port = 3000;

const setHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
}

// middleware 

app.use((req, res, next) => {
  setHeaders(res);
  next();
}); 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// endpoints
app.get("/", (req, res) => res.redirect("/recipes"));

app.get("/recipes/", (req, res) => {
  setHeaders(res);
  res.setHeader("Content-Type", "application/json");

  console.log("requested recipes");
  res.status(200).send(JSON.stringify(recipes));
});

app.get("/recipes/:id/", (req, res) => {
  setHeaders(res);
  res.setHeader("Content-Type", "application/json");

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
    sendErrorMessage(res, `Content-Type must be 'application/json'`, 415);
    return;
  }

  const recipe = req.body;
  recipe.Id = getInsertedRecipeId();

  if(!recipe) {
    sendErrorMessage(res, `Recipe is empty`, 404);
    return;
  }

  if(recipes.findIndex(r => r == recipe) !== -1) {
    sendErrorMessage(res, `There is already this recipe`, 409);
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
    sendErrorMessage(res, `Content-Type must be 'application/json'`, 415);
    return;
  }

  const oldRecipeIndex = recipes.findIndex(recipe => recipe.Id == id);
  if(oldRecipeIndex === -1) {
    sendErrorMessage(res, `No recipe found with id '${id}'`, 404);
    return;
  }

  const newRecipe = req.body;

  recipes[oldRecipeIndex] = {
    ...recipes[oldRecipeIndex],
    ...newRecipe,
  };

  console.log("updated recipe id: " + id);
  res.status(200).send();
});

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
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});