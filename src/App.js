import React, { useState } from "react";
import MetaMaskLogo from './MetaMask_Fox.svg (1).png'; 
import Web3 from "web3";
import './App.css'; 

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    setLoading(true);
    try {
      const accounts = await window?.ethereum?.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        const web3 = new Web3(window.ethereum);
        const balanceWei = await web3.eth.getBalance(accounts[0]);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(parseFloat(balanceEth).toFixed(4));
      }
    } catch (error) {
      console.error("Connection failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Welcome to CryptoConnect</h1>
      <p>Connect your MetaMask wallet to get started</p>
      <button onClick={connect} className="connect-button">
        {walletAddress ? (
          <>
            <img src={MetaMaskLogo} alt="MetaMask" className="metamask-logo" />
            {balance} ETH
          </>
        ) : (
          loading ? "Connecting..." : "Connect"
        )}
      </button>
      {walletAddress && (
        <p className="wallet-info">
          Connected to: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      )}
    </div>
  );
}

export default App;
