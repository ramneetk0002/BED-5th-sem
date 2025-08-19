const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const userData =` Name: ${name}, Email: ${email}, Password: ${password}\n`;

    fs.appendFile('file.txt', userData, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.send("<h3>Registration successful! Data saved to file</h3>");
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});