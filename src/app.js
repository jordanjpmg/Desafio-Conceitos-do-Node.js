const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

function validaterepo (request, response, next){
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id === id);
  if(!repository){
    return response.status(400).send();
  };
  return next();
}

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0,
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", validaterepo, (request, response) => {
  const {id} = request.params;
  const { title, url, techs } = request.body;
  const repository = repositories.find(repository => repository.id === id);
  repository.url = url;
  repository.title = title;
  repository.techs = techs;
  return response.json(repository);
});


app.delete("/repositories/:id", validaterepo, (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  repositories.splice(repositorieIndex, 1);
  return response.status(204).send();
});


app.post("/repositories/:id/like", validaterepo,  (request, response) => {
  const {id} = request.params;
  const repository = repositories.find(repositorie => repositorie.id === id);
  repository.likes++;
  
  return response.json(repository);
});

module.exports = app;
