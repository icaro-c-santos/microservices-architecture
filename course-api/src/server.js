const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const courseController = require('./Controllers/courseController');
const { initialize } = require('./Repositories/courseRepository');


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get('/courses/:id', courseController.getCourseById);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
  await initialize();
  console.log(`Server is running on port ${PORT}`);
});
