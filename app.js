document.addEventListener('DOMContentLoaded', () => {
    const investmentForm = document.getElementById('investmentForm');
    const withdrawButton = document.getElementById('withdrawButton');
    const connectButton = document.getElementById('connectButton');

    // Define the smart contract's ABI and address
    const contractABI = [
        {"inputs":[{"internalType":"address","name":"_wallet1","type":"address"},{"internalType":"address","name":"_wallet2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"percent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},
        {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},
        // ... (other ABI elements) ...
        {"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}
    ];
    
    const contractAddress = '0x0d7A25d695952E8815f6aE99c210Dee687528679'; // Replace with your actual contract address

    let connector;

    async function connectWallet() {
        connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcode: true,
        });

        if (!connector.connected) {
            await connector.createSession();
        }

        connector.on("connect", (error, payload) => {
            if (error) {
                console.error("Connection error:", error);
                return;
            }
            console.log("Connected accounts:", payload.params[0].accounts);
        });

        connector.on("disconnect", (error) => {
            if (error) {
                console.error("Disconnection error:", error);
                return;
            }
            console.log("Disconnected");
        });
    }

    connectButton.addEventListener('click', connectWallet);

    investmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const referrer = document.getElementById('referrer').value;

        if (!validateAmount(amount)) return;

        try {
            await invest(amount, referrer);
        } catch (error) {
            console.error('Investment failed:', error);
            alert("Investment failed. Please try again.");
        }
    });

    withdrawButton.addEventListener('click', confirmWithdrawal);

    function validateAmount(amount) {
        if (amount <= 0 || isNaN(amount)) {
            alert("Please enter a valid amount.");
            return false;
        }
        return true;
    }

    function confirmWithdrawal() {
        if (confirm("Are you sure you want to withdraw?")) {
            withdraw();
        }
    }

    async function withdraw() {
        console.log('Withdrawing...');
        try {
            let account;

            if (connector && connector.connected) {
                account = connector.accounts[0];
            } else {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                account = accounts[0];
            }

            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const result = await contract.methods.withdraw().send({ from: account });

            console.log("Withdrawal successful:", result);
            alert("Withdrawal successful!");
        } catch (error) {
            console.error('Withdrawal failed:', error);
            alert("Withdrawal failed. Please try again.");
        }
    }

    async function updateUserInfo() {
        // Logic to retrieve and update user info from the smart contract
    }
});
