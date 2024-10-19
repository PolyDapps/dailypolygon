import React, { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";

function ContractInteraction({ contract, account }) {
  const [referrer, setReferrer] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const invest = async () => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method: "invest", // Method name only
        params: [referrer],
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      setTransactionHash(transactionHash);
      console.log("Investment transaction sent! Hash:", transactionHash);
    } catch (err) {
      console.error("Investment transaction failed:", err);
      setError("Investment transaction failed: " + err.message);
    }
  };

  const withdraw = async () => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method: "withdraw", // Method name only
        params: [],
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      setTransactionHash(transactionHash);
      console.log("Withdrawal transaction sent! Hash:", transactionHash);
    } catch (err) {
      console.error("Withdrawal transaction failed:", err);
      setError("Withdrawal transaction failed: " + err.message);
    }
  };

  return (
    <div>
      <h1>Contract Interaction</h1>
      
      <div>
        <h2>Invest</h2>
        <input
          type="text"
          value={referrer}
          onChange={(e) => setReferrer(e.target.value)}
          placeholder="Referrer Address"
        />
        <button onClick={invest}>Invest</button>
      </div>
      
      <div>
        <h2>Withdraw</h2>
        <button onClick={withdraw}>Withdraw</button>
      </div>

      {transactionHash && (
        <p>Transaction Hash: {transactionHash}</p>
      )}
      
      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default ContractInteraction;
