const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/**
 * Retorna todos os dados
 */
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

/**
 * Insere um novo repositorie
 */
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title, 
    url,
    techs,
    likes: 0
  }

  repositories.push(repositorie);

  return response.json(repositorie);
});

/**
 * Altera um repositorie caso encontrar
 */
app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id = id);

  if(repositorieIndex < 0){
    return response.status(400).json({
      error:"repositorie not found"
    });
  };

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositorieIndex].likes
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);

});

/**
 * Deleta um repositorie caso encontrar
 */
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0){
    return response.status(400).json({
      error:"repositorie not found"
    });
  };

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

/**
 * Adiciona um like no repositorie a cada chamada da api
 */
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositorieIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(repositorieIndex < 0){
    return response.status(400).json({
      error:"repositorie not found"
    });
  };                                                                                             

  repositories[repositorieIndex].likes += 1;

  return response.status(204).send();
});

module.exports = app;
