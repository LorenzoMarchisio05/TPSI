import mongoose, { mongo } from "mongoose";
// admin
// recipe_db_password

const username = "admin";
const password = "recipe_db_password";
const clusterName = "Project 0";
const dbName = "recipes";

const uri = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri);

const recipeSchema = new mongoose.Schema({
    Id: String,
    Name: String,
    Description: String,
    Ingredients: [String],
    Instructions: [String],
    ExecutionTime: Number,
    Difficulty: Number,
    UrlImage: String,
});

mongoose.connection.once("open", () => {
    console.log("connected to mongodb");
});

export const recipe = mongoose.model("recipe", recipeSchema);