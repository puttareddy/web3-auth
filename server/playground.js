const express = require('express');
const AlchemyWeb3 = require('@alch/alchemy-web3');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Web3 = require('web3');
const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/g3z-MlLsjm3ysozk_KxI4AY6ilHZik3r');


const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Route for authenticating user and returning JWT token
app.post('/login', (req, res) => {
  // Perform authentication logic here
  // ...
  // If authentication is successful, generate and return JWT token
  const user = { id: 123 };
  const token = jwt.sign(user, 'secret');
  res.json({ token });
});

// Authenticated route for getting user balance
app.get('/balance', async (req, res) => {
  const userAddress = req.query.address;
  const balance = await web3.eth.getBalance(userAddress);
  res.json({ balance });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
