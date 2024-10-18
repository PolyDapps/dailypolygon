async function connectWallet() {
    const provider = new WalletConnectProvider({
        bridge: "https://bridge.walletconnect.org",
    });

    // Create a Web3 instance
    web3 = new Web3(provider);

    // Check if already connected
    if (!provider.connected) {
        await provider.enable();
    }

    // Get connected accounts
    const accounts = await web3.eth.getAccounts();
    console.log("Connected accounts:", accounts);

    // Update UI or fetch user info here

    provider.on("disconnect", (error) => {
        console.error("Disconnection error:", error);
        console.log("Disconnected");
    });
}
