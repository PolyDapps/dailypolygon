import React from "react";
import ReactDOM from "react-dom";
import { createThirdwebClient, getContract, defineChain, ThirdwebProvider } from "thirdweb/react";

// Buat klien dengan clientId Anda
const client = createThirdwebClient({
  clientId: "aa83552f8db8c2d86a9c06a13e113b0e", // Ganti dengan clientId Anda
});

// Hubungkan ke kontrak Anda
const contractAddress = "0x0d7A25d695952E8815f6aE99c210Dee687528679"; // Ganti dengan alamat kontrak Anda
const contract = getContract({
  client,
  chain: defineChain(137), // Mainnet Polygon
  address: contractAddress,
});

// Komponen utama aplikasi
function App() {
  return (
    <ThirdwebProvider>
      <h1>Selamat datang di DApp Saya</h1>
      {/* Anda bisa menambahkan lebih banyak komponen di sini */}
    </ThirdwebProvider>
  );
}

// Render aplikasi
ReactDOM.render(<App />, document.getElementById("app"));
