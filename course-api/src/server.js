const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const courseController = require('./Controllers/courseController');
const { initialize } = require('./Repositories/courseRepository');

function waitFor5Seconds() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get('/courses/:id', courseController.getCourseById);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async() => {
  await waitFor5Seconds();
  await initialize();
  console.log(`Server is running on port ${PORT}`);
});
