import express from 'express';
import bodyParser from 'body-parser';
import { recipeController } from './data/recipes.mjs';
import sendErrorMessage from './modules/error.mjs';

const app = express();
const port = 3000;

const setHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, content-type, Access-Control-Request-Method, Access-Control-Request-Headers");
}

// middleware 
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`);

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

  const recipe = recipeController.GetRecipes();

  console.log("sending recipes");
  res.status(200).send(JSON.stringify(recipe));
});

app.get("/recipes/:id/", (req, res) => {
  setHeaders(res);
  res.setHeader("Content-Type", "application/json");

  const id = req.params.id;

  const result = recipeController.GetRecipe(id);

  if(!result.success) {
    sendErrorMessage(res, result.message, result.statusCode);
    return;
  }

  console.log("sending recipe id:" + id);
  res.status(result.statusCode).send(JSON.stringify(result.value));
});

app.post("/recipes/", (req, res) => {
  setHeaders(res);

  const contentType = req.headers['content-type'];
  if(contentType !== "application/json" || !req.is("application/json")) {
    sendErrorMessage(res, `Content-Type must be 'application/json'`, 415);
    return;
  }

  const recipe = req.body;

  if(!recipe) {
    sendErrorMessage(res, `Recipe is empty`, 404);
    return;
  }

  const result = recipeController.CreateRecipe(recipe);

  if(!result.success) {
    sendErrorMessage(res, result.message, result.statusCode);
    return;
  }

  console.log("created recipe id: " + recipe.id);
  res.status(result.statusCode).send();
});

app.put("/recipes/:id/", (req, res) => {
  setHeaders(res);
  const { id } = req.params;

  const contentType = req.headers['content-type'];
  if(contentType !== "application/json" && !req.is("application/json")) {
    sendErrorMessage(res, `Content-Type must be 'application/json'`, 415);
    return;
  }
  
  const recipe = req.body;

  const result = recipeController.UpdateRecipe(recipe);
  if(!result.success) {
    sendErrorMessage(res,result.message, result.statusCode);
    return;
  }

  console.log("updated recipe id: " + id);
  res.status(result.statusCode).send();
});

app.delete("/recipes/:id/", (req, res) => {
  setHeaders(res);
  const id = req.params.id;

  const result = recipeController.DeleteRecipe(id);

  if(!result.success) {
    sendErrorMessage(res,result.message, result.statusCode);
    return;
  }

  console.log("deleted recipe id: " + id);
  res.status(result.statusCode).send();
});

app.get("/headers/", (req, res) => {
  setHeaders(res);

  const result = recipeController.GetRecipeHeaders();

  if(!result.success) {
    sendErrorMessage(res,result.message, result.statusCode);
    return;
  }

  console.log("sending recipes headers");
  res.status(result.statusCode).send(JSON.stringify(result.value));
});

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});