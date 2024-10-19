import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ThirdwebProvider } from "thirdweb/react";

// Create a Thirdweb client with your clientId
const client = createThirdwebClient({
  clientId: "aa83552f8db8c2d86a9c06a13e113b0e", // Replace with your clientId
});

// Define the wallets to support
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
  createWallet("com.safepal"),
  createWallet("pro.tokenpocket"),
  createWallet("com.bitget.web3"),
];

// Main App component
function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // This effect can be used to fetch account info on mount
    if (account) {
      // Fetch user data here, if needed
    }
  }, [account]);

  return (
    <ThirdwebProvider client={client}>
      <header>
        <h1>Daily Polygon</h1>
        <ConnectButton
          client={client}
          wallets={wallets}
          connectButton={{ label: "Connect Wallet" }}
          connectModal={{
            size: "compact",
            showThirdwebBranding: false,
          }}
          onConnect={(address) => setAccount(address)}
          onDisconnect={() => setAccount(null)}
        />
      </header>
      <main>
        <section id="investment">
          <h2>Invest for daily income, get income for years</h2>
          <form id="investmentForm" onSubmit={validateForm}>
            <label htmlFor="amount">Amount (POL):</label>
            <input type="number" id="amount" min="1" step="0.01" required />
            <label htmlFor="referrer">Referrer Address:</label>
            <input type="text" id="referrer" placeholder="Optional" />
            <button type="submit">Invest</button>
          </form>
        </section>

        <section id="withdraw">
          <h2>Withdraw</h2>
          <button id="withdrawButton" onClick={confirmWithdrawal}>
            Withdraw
          </button>
        </section>

        <section id="userInfo">
          <h2>Your Info</h2>
          <div>
            <p>Total Deposits: <span id="totalDeposits">0</span> POL</p>
            <p>Total Withdrawn: <span id="totalWithdrawn">0</span> POL</p>
            <p>Available for Withdrawal: <span id="availableBalance">0</span> POL</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Daily Polygon DApp</p>
      </footer>
    </ThirdwebProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
