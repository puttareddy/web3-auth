const express = require('express');
const Web3 = require('web3');
const app = express();
const port = 3000;

app.use(express.json());

const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/g3z-MlLsjm3ysozk_KxI4AY6ilHZik3r');

// Check if the connection is successful
web3.eth.net.isListening()
  .then(() => console.log('Connected to Alchemy'))
  .catch((err) => console.error('Failed to connect to Alchemy:', err));

const { abi } = require ( "./utils/Transactions.json");

// Replace with the contract address
const contractAddress = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';

// Create an instance of the contract object
const contract = new web3.eth.Contract(abi, contractAddress);

// Route for setting the message on the contract
app.post('/set-message', (req, res) => {
  const message = req.body.message;

  contract.methods.setMessage(message)
    .send({from: '0xMyAddress', gas: 200000})
    .then((receipt) => {
      console.log('Transaction receipt:', receipt);
      res.json({success: true});
    })
    .catch((err) => {
      console.error('Transaction error:', err);
      res.json({success: false, error: err.message});
    });
});

// Route for getting the message from the contract
app.get('/get-message', (req, res) => {
  contract.methods.getAllTransactions().call()
    .then((result) => {
      console.log('Message:', result);
      res.json({success: true, message: result});
    })
    .catch((err) => {
      console.error('Method call error:', err);
      res.json({success: false, error: err.message});
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
