function addTodo() {
      const todoText = document.getElementById('todoInput').value;

      if (todoText.trim() === "") {
        alert("Please enter a todo");
        return;
      }

      const newTodo = {
        title: todoText,
        completed: false,
        userId: 1
      };

      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      })
      .then(response => response.json())
      .then(data => {
        console.log("Todo added:", data);
        alert("Todo sent to server successfully!");
        document.getElementById('todoInput').value = "";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong");
      });
    }