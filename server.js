const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к базе данных PostgreSQL
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'myapp',
  password: 'your_password',
  port: 5432,
});

// Middleware для парсинга JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Роут для регистрации нового пользователя
app.post('/register', async (req, res) => {
  try {
    const { name, bio, profilePicture } = req.body;
    const insertQuery = 'INSERT INTO users (name, bio, profile_picture) VALUES ($1, $2, $3)';
    await pool.query(insertQuery, [name, bio, profilePicture]);
    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
