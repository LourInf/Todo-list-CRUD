import React, { useState, useEffect } from "react";
import { Spinner } from "./Spinner.jsx";

export const Home = () => {
	// useStates to manage the input value and the list (=array) of todos
	const[input, setInput] = useState("");
	const [todos, setTodos] = useState([]); 
	const [user, setUser] = useState("Lourdes");
    const [editedText, setEditedText] = useState("");
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
		//createUser(); 
		getTodos();
	  }, []); 

	  //If there's a change in my todos, it gets updated
		useEffect(() => {
		updateTodos(todos);
	}, [todos]);

    const onInputChange = (event) =>{
        setInput(event.target.value)
    }
    
    // Function to handle form submission 
    const onFormSubmit = (event) => {
        event.preventDefault(); // prevent default form submission behavior
         if (input.trim() !== "") {   // to check if the input is not empty or contains only whitespaces
            const updatedList = [...todos, { label: input, done: false }];
            setTodos(updatedList); // we add the current input value to our list (=array) of todos using the spread operator
            updateTodos(updatedList);    // Call the API to update todos on the server
            setInput(""); // once the new todo is added to the list, IT'S VERY IMPORTANT TO clear the input field
         }
     };
    
    // Function to handle Enter key press -->  if the user presses Enter and the value is not empty, we add the todo task to our list of todos. AND again, very important, we later clean de value by setting the input to empty string
    const onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
            onFormSubmit(event);
        }
     };

      const handleComplete = (index) => {
    // Update todos using map to toggle completed status for the clicked item
    setTodos((prevTodos) =>
      prevTodos.map((item, currentIndex) => {
        if (currentIndex === index) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  };

    // Function to handle task deletion
    const handleDelete = (index) => {
      // Update todos using filter to remove the clicked item
      setTodos((prevTodos) =>
        prevTodos.filter((item, currentIndex) => currentIndex !== index)
      );
    };

     // Function to handle task deletion
    const handleEdit = (index) => {
      setTodos((prevTodos) =>
      prevTodos.map((item, currentIndex) => {
        if (currentIndex === index) {
          return { ...item, editing: true };
        }
        return { ...item, editing: false };
      })
    );
    setEditedText(todos[index].label);

    }
  

    // Function to save edited task
  const saveEditedTask = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((item, currentIndex) => {
        if (currentIndex === index) {
          return { ...item, label: editedText, editing: false };
        }
        return item;
      })
    );
  };


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
                <form onSubmit = {onFormSubmit}>
                {/* Input field for entering todo */}
                
                <input className="form-control m-2 d-flex mx-auto" type="text" placeholder=" What do you need to do?" style={{width: "300px", height: "50px"}} onChange ={onInputChange}  onKeyDown={onKeyDownHandler} value = {input} ></input>
                {/* Button to submit the form */}
                <button className="btn btn-dark mb-5 mt-2" type="submit">Add Task</button>
            
                </form>
				
				<div>
                <ul className="list-group fs-4">
                {todos.map((item, index) => (
                    <li
                    className={`list-group-item ${
                        item.done ? "text-decoration-line-through" : ""
                    }`}
                    key={index}
                    >
                    {item.editing ? (
                        <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        />
                    ) : (
                        <span>{item.label}</span>
                    )}

                        <span onClick={() => handleComplete(index)}>
                    <i className="fa fa-check-circle m-1 fs-4 text-success"></i>
                    </span>
                    {item.editing ? (
                    <span onClick={() => saveEditedTask(index)}>
                        <i className="fa fa-save m-1 fs-4 text-success"></i>
                    </span>
                    ) : (
                    <span onClick={() => handleEdit(index)}>
                        <i className="fa fa-edit m-1 fs-4 text-warning"></i>
                    </span>
                    )}
                    <span onClick={() => handleDelete(index)}>
                    <i className="fa fa-trash-alt m-1 fs-4 text-danger"></i>
                    </span>
                    </li>
                    ))}
                </ul>
                </div>
				<p className="text-dark mt-5">{todos.length === 0 ? "No tasks left!" : `${todos.length} tasks left`}</p>
			</div>
		)}
	  </div>
	);
}

