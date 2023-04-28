const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");
const { Alchemy, Network } = require('alchemy-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const message = "Authenticate with MetaMask";
// const providerUrl = "https://eth-sepolia.g.alchemy.com/v2/OeRJO2_DW04UdvAGy8bocQkMSplRxswm";
// // const provider = new ethers.providers.AlchemyProvider("sepolia", {
// //     name: 'sepolia',
// //     chainId: 11155111,
// //     ensAddress: '0x898d6824468f6540117c37AfeD7B550307b2719A',
// //     apiKey: 'OeRJO2_DW04UdvAGy8bocQkMSplRxswm'
// //   });
//   const provider = new ethers.providers.AlchemyProvider("goerli", 
//    'OeRJO2_DW04UdvAGy8bocQkMSplRxswm'
//   );

 

// Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
const settings = {
  apiKey: 'OeRJO2_DW04UdvAGy8bocQkMSplRxswm', // Replace with your Alchemy API key.
  network: Network.ETH_SEPOLIA // Replace with your network.
};

const alchemy = new Alchemy(settings);


app.get("/auth", async (req, res) => {
  const provider = await alchemy.config.getProvider();
  console.log('provider'+ provider);
  const signer = provider.getSigner();

  const signature = await signer.signMessage(message);

  res.json({ signature });
});

app.post("/auth", async (req, res) => {
  const { signature } = req.body;
  const signer = provider.getSigner();

  const address = await signer.getAddress();
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);

  if (address === recoveredAddress) {
    const token = await jwt.sign({ address }, "secret", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
});

app.get("/data", authenticateToken, (req, res) => {
  res.json({ data: "Secret Data" });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      req.user = decoded;
      next();
    }
  });
}

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
