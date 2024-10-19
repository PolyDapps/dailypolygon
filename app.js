const contractAddress = '0x0d7A25d695952E8815f6aE99c210Dee687528679'; // Your contract address as a string
const apiKey = 'MS5TGWX1PK9131P621RUATWWXH16QEH9Z7'; // Your Polygonscan API key as a string
let web3;
let contract;

async function getContractABI() {
    const response = await fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`);
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
            137: "https://polygon-rpc.com/", // Polygon Mainnet
        },
    });

    await provider.enable();
    web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    console.log("Connected account:", accounts[0]);
    return accounts[0];
}

async function updateUserInfo(account) {
    const totalDeposits = await contract.methods.totalDeposits(account).call();
    const totalWithdrawn = await contract.methods.totalWithdrawn(account).call();
    const availableBalance = await contract.methods.availableBalance(account).call();

    document.getElementById('totalDeposits').textContent = web3.utils.fromWei(totalDeposits, 'ether');
    document.getElementById('totalWithdrawn').textContent = web3.utils.fromWei(totalWithdrawn, 'ether');
    document.getElementById('availableBalance').textContent = web3.utils.fromWei(availableBalance, 'ether');
}

async function init() {
    const account = await connectWallet();
    const abi = await getContractABI();
    contract = new web3.eth.Contract(abi, contractAddress);

    // Update user info after connecting wallet
    await updateUserInfo(account);

    document.getElementById('investmentForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const referrer = document.getElementById('referrer').value;

        if (amount <= 0) {
            alert("Please enter a valid amount to invest.");
            return;
        }

        try {
            // Show loading indication
            console.log("Investing...");
            const result = await contract.methods.invest(referrer).send({ from: account, value: web3.utils.toWei(amount, 'ether') });
            console.log("Investment successful:", result);
            alert("Investment successful!");
            // Update user info after investment
            await updateUserInfo(account);
        } catch (error) {
            console.error("Investment failed:", error);
            alert("Investment failed: " + error.message);
        }
    });

    document.getElementById('withdrawButton').addEventListener('click', async () => {
        try {
            // Show loading indication
            console.log("Withdrawing...");
            const result = await contract.methods.withdraw().send({ from: account });
            console.log("Withdraw successful:", result);
            alert("Withdrawal successful!");
            // Update user info after withdrawal
            await updateUserInfo(account);
        } catch (error) {
            console.error("Withdrawal failed:", error);
            alert("Withdrawal failed: " + error.message);
        }
    });
}

window.onload = init;
