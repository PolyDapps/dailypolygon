import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "aa83552f8db8c2d86a9c06a13e113b0e", // Replace with your actual client ID
});

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

function Example() {
  return (
    <div>
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
            const response = await fetch('/api/login', {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            return response.json(); // Assuming your backend returns a JSON response
          },
          async doLogout() {
            // Call your backend to logout the user if needed
            await fetch('/api/logout', { method: 'POST' });
          },
          async getLoginPayload(params) {
            // Call your backend and return the payload for signing
            const response = await fetch('/api/login-payload', {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            return response.json(); // Ensure this returns the necessary payload
          },
          async isLoggedIn() {
            // Call your backend to check if the user is logged in
            const response = await fetch('/api/check-login');
            return response.json(); // Assuming it returns { loggedIn: true/false }
          },
        }}
      />
    </div>
  );
}

export default Example;
