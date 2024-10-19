const contractAddress = '0x0d7A25d695952E8815f6aE99c210Dee687528679'; // Your contract address
const apiKey = 'MS5TGWX1PK9131P621RUATWWXH16QEH9Z7'; // Your Polygonscan API key
let web3;
let contract;

async function getContractABI() {
    const response = await fetch(https://api.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey});
    const data = await response.json();

    if (data.status === "1") {
        return JSON.parse(data.result); // The ABI will be in JSON format
    } else {
        throw new Error("Failed to fetch ABI: " + data.message);
    }
}

async function connectWallet() {
    const provider = new WalletConnectProvider.default({
        rpc: {
            137: "https://rpc-mainnet.matic.network", // Polygon Mainnet RPC
        },
    });

    try {
        await provider.enable(); // Enable session (triggers QR Code modal)
    } catch (error) {
        if (error.message.includes("User closed modal")) {
            console.warn("User canceled the wallet connection.");
            alert("Connection to wallet was canceled. Please try again.");
            return null; // Exit the function
        } else {
            console.error("Error connecting to wallet:", error);
            alert("Error connecting to wallet: " + error.message);
            return null; // Exit the function
        }
    }

    web3 = new Web3(provider); // Initialize Web3 with the WalletConnect provider

    try {
        const accounts = await web3.eth.getAccounts(); // Fetch connected accounts
        console.log("Connected account:", accounts[0]);
        return accounts[0]; // Return the connected account
    } catch (error) {
        console.error("Error fetching accounts:", error);
        alert("Error fetching accounts: " + error.message);
        return null; // Exit the function
    }
}

async function updateUserInfo(account) {
    try {
        const totalDeposits = await contract.methods.totalDeposits(account).call();
        const totalWithdrawn = await contract.methods.totalWithdrawn(account).call();
        const availableBalance = await contract.methods.availableBalance(account).call();

        document.getElementById('totalDeposits').textContent = web3.utils.fromWei(totalDeposits, 'ether');
        document.getElementById('totalWithdrawn').textContent = web3.utils.fromWei(totalWithdrawn, 'ether');
        document.getElementById('availableBalance').textContent = web3.utils.fromWei(availableBalance, 'ether');
    } catch (error) {
        console.error("Error updating user info:", error);
        alert("Error updating user info: " + error.message);
    }
}

async function init() {
    const account = await connectWallet(); // Connect the wallet
    if (!account) return; // Exit if no account is connected

    const abi = await getContractABI(); // Get the contract ABI
    contract = new web3.eth.Contract(abi, contractAddress); // Create a contract instance

    // Update user info after connecting wallet
    await updateUserInfo(account);

    document.getElementById('investmentForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const amount = document.getElementById('amount').value; // Get investment amount
        const referrer = document.getElementById('referrer').value; // Get referrer address

        if (amount <= 0) {
            alert("Please enter a valid amount to invest.");
            return;
        }

        try {
            console.log(Investing ${amount} POL with referrer: ${referrer});
            const result = await contract.methods.invest(referrer).send({ from: account, value: web3.utils.toWei(amount, 'ether') });
            console.log("Investment successful:", result);
            alert("Investment successful!");
            await updateUserInfo(account); // Update user info after investment
        } catch (error) {
            console.error("Investment failed:", error);
            alert("Investment failed: " + error.message);
        }
    });

    document.getElementById('withdrawButton').addEventListener('click', async () => {
        try {
            console.log("Withdrawing...");
            const result = await contract.methods.withdraw().send({ from: account });
            console.log("Withdraw successful:", result);
            alert("Withdrawal successful!");
            await updateUserInfo(account); // Update user info after withdrawal
        } catch (error) {
            console.error("Withdrawal failed:", error);
            alert("Withdrawal failed: " + error.message);
        }
    });
}

window.onload = init; // Initialize the application when the window loads
