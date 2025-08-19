const form = document.querySelector("#signupForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const user = {
        email: emailInput.value,
        password: passwordInput.value
    };

    axios.post("/addUser", user)
        .then(res => {
            alert(res.data.message);
            form.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Error adding user");
        });
});
