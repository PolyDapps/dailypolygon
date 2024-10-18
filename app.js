// app.js

document.addEventListener('DOMContentLoaded', () => {
    const investmentForm = document.getElementById('investmentForm');
    const withdrawButton = document.getElementById('withdrawButton');

    // Handle investment form submission
    investmentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = parseFloat(document.getElementById('amount').value);
        const referrer = document.getElementById('referrer').value;

        if (amount <= 0 || isNaN(amount)) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            await invest(amount, referrer);
        } catch (error) {
            console.error('Investment failed:', error);
            alert("Investment failed. Please try again.");
        }
    });

    // Handle withdrawal button click
    withdrawButton.addEventListener('click', async () => {
        try {
            confirmWithdrawal();
        } catch (error) {
            console.error('Withdrawal failed:', error);
            alert("Withdrawal failed. Please try again.");
        }
    });

    // Validate form input
    function validateForm() {
        const amount = parseFloat(document.getElementById('amount').value);
        if (amount <= 0 || isNaN(amount)) {
            alert("Invalid amount entered.");
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
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // Call your smart contract's withdraw method here
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            await contract.methods.withdraw().send({ from: account });

            alert("Withdrawal successful!");
        } catch (error) {
            console.error('Withdrawal failed:', error);
            alert("Withdrawal failed. Please try again.");
        }
    }

    // Update user information (this function should be implemented as needed)
    async function updateUserInfo() {
        // Logic to retrieve and update user info from the smart contract
    }
});
