# Crypto Coin Flip Game
Welcome to the Crypto Coin Flip Game! This web application allows users to connect their MetaMask wallet, place bets in ETH, and play a simple coin flip game. The application interacts with a smart contract to handle transactions and provide feedback on the game results.

## Features
Connect to MetaMask: Users can connect their MetaMask wallet to the application to interact with the Ethereum blockchain.

Place Bets: Users can bet ETH on a coin flip game.

Coin Flip Game: Play a simple game where you bet on heads or tails and see if you win.

Real-time Balance Updates: The application updates the user's ETH balance after each transaction.

Responsive Design: The app is designed to be responsive and user-friendly.

## Technologies Used
React.js: Frontend framework for building the user interface.

Web3.js: JavaScript library for interacting with the Ethereum blockchain.

MetaMask: Ethereum wallet for managing accounts and transactions.

CSS: Styling for the application.
Threejs: 3D coin

## Getting Started
### Prerequisites
Node.js: Ensure you have Node.js installed. Download Node.js

MetaMask Extension: Install the MetaMask browser extension. MetaMask
Installation

Clone the Repository

git clone ['https://github.com/HARSH-KAUSHIK261103/Coin-flip-game.git']

Navigate to the Project Directory

cd crypto-coin-flip-game

Install Dependencies

npm install

Start the Development Server

npm start

The application will be accessible at http://localhost:3000.

## Usage
Connect Your Wallet

Click the "Connect" button to connect your MetaMask wallet. The button will display your ETH balance once connected.

Place a Bet

Select the amount you want to bet in ETH.
Choose the side of the coin (Heads or Tails).
Click "Flip the Coin!" to place your bet.
View Results

After a short delay, the result of the coin flip will be displayed. If you win, your balance will be updated accordingly.

## Smart Contract Interaction
Debit User: When a bet is placed, the specified amount of ETH is deducted from the user's account.
Credit User: If the user wins the bet, the winning amount is credited back to the user's account.
