const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// Generate a message that needs to be signed by the user
const message = "Please sign this message to authenticate with the server.";

// Endpoint for authentication
app.get("/authenticate", (req, res) => {
  try {
    // Send the message to the client
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/authenticate', async (req, res) => {
  const { account, signature } = req.body;
  console.log('account--'+account)
  console.log('signature--'+signature)
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);

  if (recoveredAddress.toLowerCase() === account.toLowerCase()) {
    res.json({ message: 'Authentication successful' });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
