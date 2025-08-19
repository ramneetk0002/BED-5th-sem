function addTodo() {
      const todoText = document.getElementById("todoInput").value;

      if (todoText.trim() === "") {
        alert("Please enter a todo");
        return;
      }

      const li = document.createElement("li");
      li.textContent = todoText;
      document.getElementById("todoList").appendChild(li);

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
        console.log("Saved to database:", data);
        alert("Todo added to database!");
        document.getElementById("todoInput").value = ""; 
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Failed to save todo.");
      });
    }