import { useState } from 'react';
import './App.css';

function App() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);

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
