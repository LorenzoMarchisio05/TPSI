import { recipe } from './db.js';
import  express from 'express';

const app = express();
const port = 3000;



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
    "UrlImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

app.get("/", (req, res) => {
  res.redirect("/recipes");
});

app.get("/recipes/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  res.setHeader("content-type", "application/json");

  const recipes = await recipe.find();

  res.send(JSON.stringify(recipes));
});


app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});