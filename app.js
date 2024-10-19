import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

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

// Example component for wallet connection
function Example() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectButton={{ label: "Connect Wallet" }}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
      auth={{
        async doLogin(params) {
          // Call your backend to verify the signed payload passed in params
          // Implement your login logic here
        },
        async doLogout() {
          // Call your backend to logout the user if needed
          // Implement your logout logic here
        },
        async getLoginPayload(params) {
          // Call your backend and return the payload for login
          // Implement your payload logic here
        },
        async isLoggedIn() {
          // Call your backend to check if the user is logged in
          // Implement your check logic here
        },
      }}
    />
  );
}

export default Example;
