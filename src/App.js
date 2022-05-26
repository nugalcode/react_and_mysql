import { useState } from 'react';
import './App.css';
import Axios from 'axios' 

function App() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);

    const [newWage, setNewWage] = useState(0);

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

    const updateEmployeeWage = (id) => {
        Axios.put('http://localhost:3001/update', { wage: newWage, id: id })
            .then((response) => {
                setEmployeeList(employeeList.map((val) => {
                    return val.id === id ? { ...val, wage: newWage } : val;
                }))
            })
    }

    const deleteEmployee = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`)
            .then((response) => {
                setEmployeeList(employeeList.filter((val) => {
                    return val.id !== id;
                }))
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
                            <div> 
                                <h3> Name: {employee.name}</h3>
                                <h3> Age: {employee.age}</h3>
                                <h3> Country: {employee.country}</h3>
                                <h3> Position: {employee.position}</h3>
                                <h3> Wage: {employee.wage}</h3>
                            </div>
                            <div>
                                <input type="text"
                                    placeholder="new wage"
                                    onChange={(e) => setNewWage(e.target.value)}
                                />
                                <button onClick={() => updateEmployeeWage(employee.id)}> Update </button>
                                <button onClick={() => deleteEmployee(employee.id)}> Delete </button>
                            </div>
                        </div>
                    )

                })}
            </div> 
        </div >
  );
}

export default App;
