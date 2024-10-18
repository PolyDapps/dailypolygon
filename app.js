document.addEventListener('DOMContentLoaded', () => {
    const investmentForm = document.getElementById('investmentForm');
    const withdrawButton = document.getElementById('withdrawButton');
    const connectButton = document.getElementById('connectButton');

    // Define your smart contract's ABI and address
    const contractABI = [{"inputs":[{"internalType":"address","name":"_wallet1","type":"address"},{"internalType":"address","name":"_wallet2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"plan","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"percent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"finish","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"Newbie","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"address","name":"referral","type":"address"},{"indexed":true,"internalType":"uint256","name":"level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RefBonus","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"INVEST_MIN_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENTS_DIVIDER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"REFERRAL_PERCENTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"getPlanByValue","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanHoldMultiplier","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getPlanInfo","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"deposit","type":"uint256"}],"name":"getResult","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAmountOfDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserCheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getUserDepositInfo","outputs":[{"internalType":"uint8","name":"plan","type":"uint8"},{"internalType":"uint256","name":"percent","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"},{"internalType":"uint256","name":"holdBonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDownlineCount","outputs":[{"internalType":"uint256[30]","name":"","type":"uint256[30]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint8","name":"plan","type":"uint8"}],"name":"getUserPercentRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferralTotalBonus","outputs":[{"internalType":"uint256[30]","name":"","type":"uint256[30]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalDeposits","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserTotalWithdrawn","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserWithdrawn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrer","type":"address"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"msgvalue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRefBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalUsers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    
    const contractAddress = '0x0d7A25d695952E8815f6aE99c210Dee687528679'; // Replace with your actual contract address

    let connector;

    // Connect to WalletConnect
    async function connectWallet() {
        connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Bridge server
            qrcode: true,
        });

        if (!connector.connected) {
            await connector.createSession();
        }

        // Listen for connection events
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

    // Event listener for the connect button
    connectButton.addEventListener('click', connectWallet);

    // Handle investment form submission
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

    // Handle withdrawal button click
    withdrawButton.addEventListener('click', confirmWithdrawal);

    // Validate investment amount
    function validateAmount(amount) {
        if (amount <= 0 || isNaN(amount)) {
            alert("Please enter a valid amount.");
            return false;
        }
        return true;
    }

    // Confirm withdrawal action
    function confirmWithdrawal() {
        if (confirm("Are you sure you want to withdraw?")) {
            withdraw();
        }
    }

    // Withdraw function implementation
    async function withdraw() {
        console.log('Withdrawing...');
        try {
            let account;

            // Check if connected via WalletConnect
            if (connector && connector.connected) {
                account = connector.accounts[0];
            } else {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                account = accounts[0];
            }

            // Create a contract instance
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            
            // Call the withdraw method on the smart contract
            const result = await contract.methods.withdraw().send({ from: account });

            console.log("Withdrawal successful:", result);
            alert("Withdrawal successful!");
        } catch (error) {
            console.error('Withdrawal failed:', error);
            alert("Withdrawal failed. Please try again.");
        }
    }

    // Update user information (to be implemented)
    async function updateUserInfo() {
        // Logic to retrieve and update user info from the smart contract
    }
});
