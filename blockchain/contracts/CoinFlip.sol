// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    // Events
    event BetPlaced(address indexed user, uint256 amount, bool win);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Allow contract to receive ETH
    receive() external payable {}

    // Function to debit ETH from user when they place a bet
    function debitUser() external payable {
        require(msg.value > 0, "Bet amount must be greater than 0");

        // Emit an event indicating that the bet was placed
        emit BetPlaced(msg.sender, msg.value, false);
    }

    // Function to credit ETH to the user if they win
    function creditUser(uint256 betAmount) external {
    require(betAmount > 0, "Bet amount must be greater than 0");

    // Calculate the winnings: double the bet amount
    uint256 winnings = betAmount * 2;

    // Ensure the contract has enough balance to cover the winnings
    require(address(this).balance >= winnings, "Insufficient contract balance");

    // Send the winnings to the user
    sendPayment(payable(msg.sender), winnings);

    // Emit an event indicating that the user won
    emit BetPlaced(msg.sender, betAmount, true);
    }

// Helper function to send payment
    function sendPayment(address payable recipient, uint256 amount) internal {
    (bool success, ) = recipient.call{value: amount}("");
    require(success, "Payment failed.");
   }

    
}
