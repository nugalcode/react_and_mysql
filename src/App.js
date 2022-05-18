import { useState } from 'react';
import './App.css';

function App() {

    const [name, setName] = useState("");

  return (
      <div className="App">
          <div className="information">
              <label>Name </label>
              <input type="text"/>
              <label>Age </label>
              <input type="number" />
              <label>Country </label>
              <input type="text" />
              <label>Position </label>
              <input type="text" />
              <label>Wage </label>
              <input type="number" />
              <button> Add Employee </button>
          </div>
      </div >
  );
}

export default App;
