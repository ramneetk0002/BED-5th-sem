const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3212;
const USERS_FILE = path.join(__dirname, 'user.json');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Initialize user.json file
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/add-user', (req, res) => {
  const { name, email, role } = req.body;
  
  // Validation
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Read existing users
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  
  // Check for duplicate email
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Add new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    role
  };
  
  users.push(newUser);
  
  // Save to file
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  
  res.json({ message: 'User added successfully!', user: newUser });
});

app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  
  // Remove date from response if you don't want to send it at all
  const usersWithoutDate = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }));
  
  res.json(usersWithoutDate);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started`);
});