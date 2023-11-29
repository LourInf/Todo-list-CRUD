import React, { useState, useEffect } from "react";
import { Form } from "./form.jsx";
import { TodosList } from "./TodosList.jsx";
import { Spinner } from "./Spinner.jsx";

export const Home = () => {
	// useStates to manage the input value and the list (=array) of todos
	const[input, setInput] = useState("");
	const [todos, setTodos] = useState([]); 
	
	const [user, setUser] = useState("Lourdes");
	const url_base = "https://playground.4geeks.com/apis/fake/todos"  
	
	//Function to create (POST) new user Lourdes to be used with button
	const createUser = async () => {
        const url = url_base + "/user/" + user;
        const options = {
			method: "POST",
			headers:{
				"Content-Type": "application/json",
			},
			body: JSON.stringify([])
		};
        const response = await fetch (url, options);
        if (response.ok) {
          const data = await response.json();
		  console.log(data);
        } else {
          console.log("Error: ", response.status, response.statusText)
        }
      }

	  //Function to get the todos for user Lourdes to be used with button
	  const getTodos = async () => {
		const url = url_base + "/user/" + user;
        const options = {
			method: "GET",
		};
        const response = await fetch (url, options);
        if (response.ok) {
          const data = await response.json();
		  console.log(data);
		  // here we update the list of todos with setTodos()
		  setTodos(data);
        } else {
          console.log("Error: ", response.status, response.statusText)
        }
	  }

	  const updateTodos = async (updatedList) => {
		const url = url_base + "/user/" + user;
		const options = {
		  method: "PUT",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(updatedList),
		};
		console.log(updatedList);
		const response = await fetch(url, options);
		if (response.ok) {
		  const data = await response.json();
		  console.log(data);
		  setTodos(updatedList); // Pass the data to setTodos
		} else {
		  console.log("Error: ", response.status, response.statusText);
		}
	  };


	  const deleteUserAndTodos = async () => {
        const url = url_base + "/user/" + user;
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }
        
        const response = await fetch(url, options)
            if (response.ok) {
				const data = await response.json();
		  		console.log(data);
				  setTodos([]); //I want setTodos to have an empty array
        }
        else {
			console.log("Error: ", response.status, response.statusText);
        }
    }    

	  useEffect(() => {
		//createUser(); ------------>>>>  //I'M NOT SURE IF THIS IS NEEDED, AS WE HAVE A BUTTON FOR GETTING ALL TODOS
		getTodos();
	  }, []); 

	  //If there's a change in my todos, it gets updated
		useEffect(() => {
		updateTodos(todos);
	}, [todos]);


	return (

		<div className="container bg-light min-vh-100 justify-content-center">
		{!todos ? (
		  <Spinner />
		) : (
		   <div className=" border text-center mt-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
				<button className="btn btn-outline-dark me-3 mb-5" onClick={createUser}>
				New User
				</button>
				<button className="btn btn-outline-dark mb-5 me-3" onClick={getTodos}>
				Get Tasks
				</button>
				<button className="btn btn-outline-danger mb-5" onClick={deleteUserAndTodos}>
                    Delete User and Todos
                </button>
				
				<h1 className="text-center mb-5">Todo List </h1>
				
			
			
				<Form
				  input={input}
				  setInput={setInput}
				  todos={todos}
				  setTodos={setTodos}
				/>
				
				<div>
				<TodosList todos={todos} setTodos={setTodos} />
				</div>
				<p className="text-dark mt-5">{todos.length === 0 ? "No tasks left!" : `${todos.length} tasks left`}</p>
			</div>
		)}
	  </div>
	);
}

