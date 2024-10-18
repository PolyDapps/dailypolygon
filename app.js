let web3;
let account;

// Function to connect to the wallet
export async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            web3 = new Web3(window.ethereum);

            console.log("Connected account:", account);
            alert(`Wallet connected: ${account}`);
        } catch (error) {
            console.error("Connection failed:", error);
            alert("Connection failed. Please try again.");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Function to validate the investment form
export function validateForm() {
    const amount = document.getElementById('amount').value;
    if (amount <= 0) {
        alert("Please enter a valid amount.");
        return false;
    }
    return true;
}

// Function to handle investment submission
export async function handleInvestment(event) {
    event.preventDefault();
    if (!account) {
        alert("Please connect your wallet first.");
        return;
    }

    const amount = document.getElementById('amount').value;
    const referrer = document.getElementById('referrer').value;

    console.log(`Investing ${amount} POL with referrer: ${referrer}`);
    alert(`Investment of ${amount} POL confirmed!`);
}

// Function to confirm withdrawal
export function confirmWithdrawal() {
    if (!account) {
        alert("Please connect your wallet first.");
        return;
    }

    console.log("Withdrawal confirmed!");
    alert("Withdrawal confirmed!");
}

// Add event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('connectButton').addEventListener('click', connectWallet);
    document.getElementById('investmentForm').addEventListener('submit', handleInvestment);
    document.getElementById('withdrawButton').addEventListener('click', confirmWithdrawal);
});
