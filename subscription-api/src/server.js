const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const subscriptionController = require('./Controllers/subscriptionController');
const { initialize } = require('./Repositories/subscriptionRepository');
const { v4: uuidv4 } = require("uuid");

function waitFor5Seconds() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}



app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const traceId = req.headers["trace-id"] || uuidv4();
  req.traceId = traceId;
  res.setHeader("trace-id", traceId);
  next();
});

app.get('/subscriptions/:userId', subscriptionController.getSubscriptions);


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await waitFor5Seconds();
  await initialize();
  console.log(`Server is running on port ${PORT}`);
});
