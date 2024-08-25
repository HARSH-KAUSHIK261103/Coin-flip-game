import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import { address, abi } from './constant';

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      initWeb3();
    } else {
      console.error("Please install MetaMask!");
    }
  }, []);

  useEffect(() => {
    if (web3 && walletAddress) {
      const intervalId = setInterval(async () => {
        const balanceWei = await web3.eth.getBalance(walletAddress);
        setBalance(web3.utils.fromWei(balanceWei, 'ether')); // Display balance in ETH
      }, 5000); // Update every 5 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [web3, walletAddress]);

  const initWeb3 = async () => {
    const web3Instance = new Web3(window.ethereum);
    const contractInstance = new web3Instance.eth.Contract(abi, address);
    setWeb3(web3Instance);
    setContract(contractInstance);

    // Request accounts access
    const userAccounts = await web3Instance.eth.getAccounts();
    setAccounts(userAccounts);
    setWalletAddress(userAccounts[0]);
    const balanceWei = await web3Instance.eth.getBalance(userAccounts[0]);
    setBalance(web3Instance.utils.fromWei(balanceWei, 'ether')); // Display balance in ETH
  };

  const connect = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const userAccounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (userAccounts.length > 0) {
          setAccounts(userAccounts);
          setWalletAddress(userAccounts[0]);
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const balanceWei = await web3Instance.eth.getBalance(userAccounts[0]);
          setBalance(web3Instance.utils.fromWei(balanceWei, 'ether')); // Display balance in ETH
        }
      } catch (error) {
        console.error("Connection failed", error);
      }
      setLoading(false);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const debitUser = async (amount) => {
    if (!web3 || !contract || accounts.length === 0) {
      console.error("Web3 or Contract not initialized, or no accounts found.");
      return;
    }

    console.log(`Debiting user: ${amount} ETH`);

    try {
      await contract.methods.debitUser().send({
        from: accounts[0],
        value: web3.utils.toWei(amount.toString(), 'ether'), 
        gas: 300000,
      });
      console.log("Debit transaction successful");
    } catch (error) {
      console.error("Error debiting user:", error);
    }
  };

  const creditUser = async (amount) => {
    if (!web3 || !contract || accounts.length === 0) {
      console.error("Web3 or Contract not initialized, or no accounts found.");
      return;
    }

    console.log(`Crediting user: ${amount} ETH`);

    try {
      await contract.methods.creditUser(web3.utils.toWei(amount.toString(), 'ether')).send({ 
        from: accounts[0],
        gas: 300000,
      });
      console.log("Credit transaction successful");
    } catch (error) {
      console.error("Error crediting user:", error);
    }
  };

  return (
    <Web3Context.Provider value={{ walletAddress, balance, loading, connect, debitUser, creditUser }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
