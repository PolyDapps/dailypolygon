// app.js
document.addEventListener("DOMContentLoaded", async () => {
    const connectButton = document.getElementById("connectButton");
    const investmentForm = document.getElementById("investmentForm");
    const withdrawButton = document.getElementById("withdrawButton");
    
    // WalletConnect provider
    let provider;

    connectButton.addEventListener("click", async () => {
        // Initialize WalletConnect Provider
        provider = new WalletConnectProvider.default({
            infuraId: "ee5a337fe17e4c87839b94a7d6804b13", // Replace with your Infura ID
        });

        // Connect to the wallet
        await provider.enable();
        
        // Initialize Web3 with WalletConnect provider
        const web3 = new Web3(provider);

        // Get the user's wallet address
        const accounts = await web3.eth.getAccounts();
        console.log("Connected account:", accounts[0]);

        // Optionally display the address in the UI
        // For example, add a new element on the page to show the address
    });

    investmentForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const amount = document.getElementById("amount").value;
        const referrer = document.getElementById("referrer").value;
        
        // Logic for investment here
        console.log("Investing amount:", amount, "Referrer:", referrer);
    });

    withdrawButton.addEventListener("click", async () => {
        // Logic for withdrawing funds here
        console.log("Withdraw clicked");
    });
});
