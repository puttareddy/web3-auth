import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Import the ABI and contract address
import MLRegistryABI from './abis/MLRegistryABI.json';
import UserInfoABI from './abis/UserInfoABI.json';
const MLRegistryAddress = '0xa1456Bc2EC3f28C9deEECBc7EC68926858e3A9b9';

const MyComponent = () => {
  const [contractInstance, setContractInstance] = useState(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const connectToContract = async () => {
      // Connect to the Ethereum provider (e.g., MetaMask)
      await window.ethereum.enable();

      // Create a new ethers.js provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
        
      // Create an instance of the main contract
      const contract = new ethers.Contract(MLRegistryAddress, MLRegistryABI, provider.getSigner());
      setContractInstance(contract);
    };

    connectToContract();
  }, []);

  // Function to interact with the contract
  const callDelegateMethod = async () => {
    if (contractInstance) {

    const userInfoContract = new ethers.Contract(MLRegistryAddress, UserInfoABI, contractInstance.provider);

    // Call the method on the delegate contract
    const userInfo = await userInfoContract.getAllInfo('0x0DC8A8D050bCe94448ea08B69ff4DECDfF2FcB52', '1');
      console.log({rawData: userInfo, transromed: [Object.fromEntries(userInfo)]});
      setUserData(Object.fromEntries(userInfo));
    }
  };

  const addAttribute = async () => {
    if (contractInstance) {

    const userInfoContract = new ethers.Contract(MLRegistryAddress, UserInfoABI, contractInstance.provider.getSigner());

    // Call the method on the delegate contract
    const res = await userInfoContract.addEmployeeAttribute('age');
      console.log(res);
    }
  };

  const setEmployeeInfo = async () => {
    if (contractInstance) {

    const userInfoContract = new ethers.Contract(MLRegistryAddress, UserInfoABI, contractInstance.provider.getSigner());

    // Call the method on the delegate contract
    const res = await userInfoContract.setEmployeeInfo('0', [['age','40']]);
      console.log(res);
    }
  };

  const minEmployee = async () => {
    if (contractInstance) {

    const userInfoContract = new ethers.Contract(MLRegistryAddress, UserInfoABI, contractInstance.provider.getSigner());

    // Call the method on the delegate contract
    const res = await userInfoContract.mintEmployee('0x0DC8A8D050bCe94448ea08B69ff4DECDfF2FcB52', [['name','junaid aslam'], ['email','junaid.aslam@mobilelive.ca'], ['age','30']]);
      console.log(res);
    }
  };

  const setProxyAddress = async () => {
    if (contractInstance) {

    const userInfoContract = new ethers.Contract(MLRegistryAddress, UserInfoABI, contractInstance.provider.getSigner());

    // Call the method on the delegate contract
    const res = await userInfoContract.setEmployeeIdProxyAddress('0x0DC8A8D050bCe94448ea08B69ff4DECDfF2FcB52');
      console.log(res);
    }
  };

  return (
    <div>
      <button onClick={callDelegateMethod}>Get All Info</button>
      <br/>
      <h1>User Data</h1>
      <p>{JSON.stringify(userData)}</p>
      <br/>
      <button onClick={addAttribute}>Add Attribute</button>

      <br/>
      <br/>
      <button onClick={setEmployeeInfo}>Set Age</button>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={setProxyAddress}>Set Proxy Address</button>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={minEmployee}>Min User</button>
    </div>
  );
};

export default MyComponent;
