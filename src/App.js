import React, { useState } from 'react';
import MetaMaskLogo from './MetaMask_Fox.svg (1).png';
import './App.css';
import ThreeCoin from './ThreeCoin';
import { useWeb3 } from './context/BlockchainContext';

function App() {
  const { walletAddress, balance, loading, connect, debitUser, creditUser } = useWeb3();
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState('');
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    
    const isValid = /^(\d*\.?\d*)?$/.test(value);

   
    if (isValid) {
      setAmount(value);
    }
  };

  const handleBlur = () => {
    
    if (amount === '' || parseFloat(amount) <= 0) {
      setAmount('');
    }
  };

  const flipCoin = async () => {
    setFlipping(true);
    setResult(null);

    try {
      
      await debitUser(amount);

      
      setTimeout(async () => {
        const randomSide = Math.random() < 0.5 ? 'Heads' : 'Tails';
        const win = side === randomSide;
        console.log(`Side: ${side}, Random Side: ${randomSide}`);
        console.log(`Win Value: ${win}, Type: ${typeof win}`);
        setFlipping(false);
        
        if (win) {
         
          await creditUser(amount);
          setResult(`You won! You get ${amount * 2} ${selectedToken}`);
        } else {
          setResult('You lost! Better luck next time.');
        }
       
      }, 3000);
    } catch (error) {
      console.error("Error during transaction:", error);
      setResult('Error processing transaction. Please try again.');
      setFlipping(false);
    }
  };

  return (
    <div className="app-container">
      <button onClick={connect} className="connect-button">
        {walletAddress ? (
          <>
            <img src={MetaMaskLogo} alt="MetaMask" className="metamask-logo" />
            {balance} ETH
          </>
        ) : (
          loading ? 'Connecting...' : 'Connect'
        )}
      </button>
      <h1>Crypto Coin Flip Game</h1>
      <p>Select the amount and side you want to bet on:</p>
      <div className="game-container">
        <div className="form-group">
          <label htmlFor="token-select">Select Token:</label>
          <select
            id="token-select"
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
          >
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount-input">Amount to Bet:</label>
          <input
            id="amount-input"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            onBlur={handleBlur}
            placeholder="Enter amount"
          />
        </div>
        <div className="selection-container">
          <div className="coin-container">
            <ThreeCoin flipping={flipping} />
          </div>
          <div className="form-group">
            <label>Select Side:</label>
            <div className="side-buttons-container">
              <button
                className={`side-button ${side === 'Heads' ? 'selected' : ''}`}
                onClick={() => setSide('Heads')}
              >
                Heads
              </button>
              <button
                className={`side-button ${side === 'Tails' ? 'selected' : ''}`}
                onClick={() => setSide('Tails')}
              >
                Tails
              </button>
            </div>
          </div>
        </div>
        <button className="flip-button" onClick={flipCoin} disabled={!amount || !side}>
          Flip the Coin!
        </button>
        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
}

export default App;


