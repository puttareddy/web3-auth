const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/authenticate', async (req, res) => {
  const { account, signature } = req.body;
  console.log('account--'+account)
  console.log('signature--'+signature)
  const message = 'Please sign this message to authenticate with the server.';
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
