import React, { useState } from 'react';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

const contractAddress = "0x0d7A25d695952E8815f6aE99c210Dee687528679"; // Replace with your contract address
const abi = [{"inputs":[{"internalType":"address","name":"_wallet1","type":"address"},{"internalType":"address","name":"_wallet2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"percent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"getPlanByValue","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanHoldMultiplier","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"deposit","type":"uint256"}],"name":"getResult","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserCheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"},{"internalType":"uint256","name":"holdBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDownlineCount","outputs":[{"internalType":"uint256[30]","name":"","type":"uint256[30]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getUserPercentRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"internalType":"uint256[30]","name":"","type":"uint256[30]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalWithdrawn","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"msgvalue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

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
