import { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

function App() {
  const [account, setAccount] = useState('');
  const [signature, setSignature] = useState('');

  const connectMetamask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const message = 'Please sign this message to authenticate with the server.';
      const signedMessage = await signer.signMessage(message);
      setAccount(accounts[0]);
      setSignature(signedMessage);
    } else {
      alert('Metamask not detected');
    }
  };

  const authenticateWithServer = async () => {
    const response = await fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account, signature }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="App">
      <button onClick={connectMetamask}>Connect Metamask</button>
      {signature && (
        <button onClick={authenticateWithServer}>Authenticate with server</button>
      )}
    </div>
  );
}

export default App;
