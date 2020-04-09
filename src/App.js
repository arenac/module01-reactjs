import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then((response) => {
        setRepos(response.data);
      }); 
  },[]);

  function handleAddRepository() {
    api.post('repositories', {
      url: "https://github.com/arenac/module01-reactjs",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }).then((response) => {
      if(response.data) {
        setRepos([...repos, response.data]);
      }
    });
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
