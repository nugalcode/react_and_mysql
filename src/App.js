import { useState } from 'react';
import './App.css';
import Axios from 'axios' 

function App() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);

    const [employeeList, setEmployeeList] = useState([]);

    // send the user input to our server endpoint using Axios library
    const addEmployee = () => {
        console.log(name, age, country, position, wage);
        Axios.post('http://localhost:3001/create',
            {
                name: name,
                age: age,
                country: country,
                position: position,
                wage: wage
            }
        ).then((res) => {
            console.log("success");
            setEmployeeList([...employeeList,
                {
                name: name,
                age: age,
                country: country,
                position: position,
                wage: wage
                }
            ])
        })
    }

    const showEmployees = () => {
        Axios.get('http://localhost:3001/employees')
            .then((response) => {
                console.log(response);
                setEmployeeList(response.data);
            })
    }

    return (
        <div className="App">
            <div className="information">
                <label>Name </label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
                <label>Age </label>
                <input type="number" onChange={(e) => setAge(e.target.value)}/>
                <label>Country </label>
                <input type="text" onChange={(e) => setCountry(e.target.value)}/>
                <label>Position </label>
                <input type="text" onChange={(e) => setPosition(e.target.value)}/>
                <label>Wage </label>
                <input type="number" onChange={(e) => setWage(e.target.value)}/>
                <button onClick={() => addEmployee()}> Add Employee </button>
            </div>

            <div className="employees"> 
                <button className="showButton" onClick={() => showEmployees()}> Show Employees </button>
                {employeeList.map((employee, index) => {
                    return (
                        <div className="employee" key={employee.id}>
                            <h3> Name: {employee.name}</h3>
                            <h3> Age: {employee.age}</h3>
                            <h3> Country: {employee.country}</h3>
                            <h3> Position: {employee.position}</h3>
                            <h3> Wage: {employee.wage}</h3>
                        </div>
                    )

                })}
            </div> 
        </div >
  );
}

export default App;
