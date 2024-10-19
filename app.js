import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { Network, Alchemy } from 'alchemy-sdk';

const contractAddress = '0x0d7A25d695952E8815f6aE99c210Dee687528679'; // Your contract address
const apiKey = 'MS5TGWX1PK9131P621RUATWWXH16QEH9Z7'; // Your Polygonscan API key

const settings = {
  apiKey: "ezF3VDoQIZi2a3muxc7B1ybAviBocfrg",
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);
const client = createThirdwebClient({
  clientId: "aa83552f8db8c2d86a9c06a13e113b0e",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

let web3;
let contract;
let userAccount; // Store user account globally

async function getContractABI() {
    const response = await fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.status === "1") {
        return JSON.parse(data.result); // The ABI will be in JSON format
    } else {
        throw new Error("Failed to fetch ABI: " + data.message);
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
    const abi = await getContractABI(); // Get the contract ABI
    contract = new web3.eth.Contract(abi, contractAddress); // Create a contract instance

    // Update user info after connecting wallet
    if (userAccount) {
        await updateUserInfo(userAccount);
    }

    document.getElementById('investmentForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const amount = document.getElementById('amount').value; // Get investment amount
        const referrer = document.getElementById('referrer').value; // Get referrer address

        if (!userAccount) {
            alert("Please connect your wallet first.");
            return;
        }

        if (amount <= 0) {
            alert("Please enter a valid amount to invest.");
            return;
        }

        try {
            console.log(`Investing ${amount} POL with referrer: ${referrer}`);
            const result = await contract.methods.invest(referrer).send({ from: userAccount, value: web3.utils.toWei(amount, 'ether') });
            console.log("Investment successful:", result);
            alert("Investment successful!");
            await updateUserInfo(userAccount); // Update user info after investment
        } catch (error) {
            console.error("Investment failed:", error);
            alert("Investment failed: " + error.message);
        }
    });

    document.getElementById('withdrawButton').addEventListener('click', async () => {
        if (!userAccount) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            console.log("Withdrawing...");
            const result = await contract.methods.withdraw().send({ from: userAccount });
            console.log("Withdraw successful:", result);
            alert("Withdrawal successful!");
            await updateUserInfo(userAccount); // Update user info after withdrawal
        } catch (error) {
            console.error("Withdrawal failed:", error);
            alert("Withdrawal failed: " + error.message);
        }
    });
}

// Add the ConnectButton to your HTML
function renderConnectButton() {
    const connectButtonContainer = document.getElementById('connectButtonContainer');
    connectButtonContainer.innerHTML = `<div id="connect-button"></div>`;
    
    // Render the ConnectButton
    const connectButton = <ConnectButton
        client={client}
        wallets={wallets}
        connectModal={{ size: "compact" }}
        onConnect={(account) => {
            userAccount = account.address; // Get the connected account address
            init(); // Initialize the DApp with the connected account
        }}
    />;
    ReactDOM.render(connectButton, document.getElementById('connect-button'));
}

window.onload = () => {
    renderConnectButton(); // Render the ConnectButton when the window loads
};
