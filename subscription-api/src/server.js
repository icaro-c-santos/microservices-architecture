const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const subscriptionController = require('./Controllers/subscriptionController');
const { initialize } = require('./repositories/courseRepository');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.get('/subscriptions/:userId', subscriptionController.getSubscriptions);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
        await initialize();
  console.log(`Server is running on port ${PORT}`);
});
