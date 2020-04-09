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

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then((response) => {
        if(response.status === 204) {
          const _repos = repos.filter(r => r.id !== id);
          setRepos(_repos);
        }
      })
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
