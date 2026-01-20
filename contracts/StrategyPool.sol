// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StrategyPool is ERC20 {
    address public manager;
    uint256 public totalCapital;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Not manager");
        _;
    }

    // Investors deposit ETH and receive shares
    function deposit() external payable {
        require(msg.value > 0, "Zero deposit");

        uint256 shares;
        if (totalSupply() == 0) {
            shares = msg.value;
        } else {
            shares = (msg.value * totalSupply()) / totalCapital;
        }

        _mint(msg.sender, shares);
        totalCapital += msg.value;
    }

    // Withdraw proportional capital
    function withdraw(uint256 shares) external {
        require(balanceOf(msg.sender) >= shares, "Not enough shares");

        uint256 amount = (shares * totalCapital) / totalSupply();

        _burn(msg.sender, shares);
        totalCapital -= amount;

        payable(msg.sender).transfer(amount);
    }

    // Called by oracle / manager to apply PnL
    function applyPnL(int256 pnl) external onlyManager {
        if (pnl >= 0) {
            totalCapital += uint256(pnl);
        } else {
            totalCapital -= uint256(-pnl);
        }
    }
}
