import React, { useState }  from "react";


//TodosList component --> displays the todo list items on the screen
export const TodosList = ({todos, setTodos }) => {

  const [editedText, setEditedText] = useState("");



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
      );
    };
