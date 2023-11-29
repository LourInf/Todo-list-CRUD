import React from "react";

//Form component -->  handles user input and adds todos to the list
export const Form = ({ input,setInput, todos, setTodos, updateTodos }) => {

    // Function to handle input changes --> update input state with current value of the input field
    const onInputChange = (event) =>{
    setInput(event.target.value)
}

    // Function to handle form submission
    const onFormSubmit = (event) => {
        event.preventDefault();    // prevent default form submission behavior
        if (input.trim() !== "") {  // to check if the input is not empty or contains only whitespaces
            const updatedList = [...todos, { label: input, done: false }];
            setTodos([updatedList]); // we add the current input value to our list (=array) of todos using the spread operator
            setInput(""); // once the new todo is added to the list, IT'S VERY IMPORTANT TO clear the input field
            updateTodos (updatedList);  // Call the API to update todos on the server ------------------> or should it be updateTodos([...todos, { label: input, done: false }]);  
                      
        }
    };

    // Function to handle Enter key press -->  if the user presses Enter and the value is not empty, we add the todo task to our list of todos. AND again, very important, we later clean de value by setting the input to empty string
    const onKeyDownHandler = (event) => {
        if (event.key === "Enter") {
        event.preventDefault();
        if (input.trim() !== "") {
            setTodos([...todos, { label: input, done: false }]); 
            setInput("");
            updateTodos (updatedList); 
        }
        }
    };

     // Render the form component
    return (
      
        <form onSubmit = {onFormSubmit}>
            {/* Input field for entering todo */}
            
            <input className="form-control m-2 d-flex mx-auto" type="text" placeholder=" What do you need to do?" style={{width: "300px", height: "50px"}} onChange ={onInputChange}  onKeyDown={onKeyDownHandler} value = {input}  updateTodos={updateTodos}></input>
             {/* Button to submit the form */}
            <button className="btn btn-dark mb-5 mt-2" type="submit">Add Task</button>
           
        </form>
    
       
      
    )

}

