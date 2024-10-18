import React, { useState } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

const contractAddress = "0x0d7A25d695952E8815f6aE99c210Dee687528679"; // Replace with your contract address
const abi = [
  {"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"increment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}
];

function App() {
  const [account, setAccount] = useState(null);
  const [currentCount, setCurrentCount] = useState(0);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    const walletConnectProvider = new WalletConnectProvider.default({
      rpc: {
        137: "https://polygon-rpc.com/",   // Polygon mainnet
      },
    });

    await walletConnectProvider.enable();
    setProvider(walletConnectProvider);
    const web3 = new Web3(walletConnectProvider);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log("Connected account:", accounts[0]);
  };

  const incrementValue = async () => {
    if (!provider || !account) {
      console.error("Wallet not connected!");
      return;
    }

    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
      await contract.methods.increment().send({ from: account });
      console.log("Increment successful");
      getCurrentCount(); // Update count after increment
    } catch (error) {
      console.error("Increment failed:", error);
    }
  };

  const getCurrentCount = async () => {
    if (!provider || !account) {
      console.error("Wallet not connected!");
      return;
    }

    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
      const count = await contract.methods.count().call();
      setCurrentCount(count);
    } catch (error) {
      console.error("Failed to get count:", error);
    }
  };

  return (
    <div>
      <h1>Wallet Connect DApp</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <h2>Connected Account: {account}</h2>
          <button onClick={incrementValue}>Increment Value</button>
          <button onClick={getCurrentCount}>Get Current Count</button>
          <h2>Current Count: {currentCount}</h2>
        </>
      )}
    </div>
  );
}

export default App;
