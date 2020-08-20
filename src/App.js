import React, { useState, useEffect } from "react";

import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => setRepositories(response.data))
  },[])

  async function handleAddRepository() {
    const response =  await api.post('repositories',{
      title: `Novo Projeto ${Date.now()}`,
      owner: "Vitu pau para toda a obra",
  })
    setRepositories([...repositories,response.data])

    // TODO
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(
      setRepositories(repositories.filter(rep => rep.id !== id))
    )
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
