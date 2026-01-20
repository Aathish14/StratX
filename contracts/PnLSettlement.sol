// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StrategyPool.sol";

contract PnLSettlement {
    address public oracle;

    constructor(address _oracle) {
        oracle = _oracle;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not oracle");
        _;
    }

    function updateOracle(address newOracle) external onlyOracle {
        oracle = newOracle;
    }

    function reportPnL(address pool, int256 pnl) external onlyOracle {
        StrategyPool(pool).applyPnL(pnl);
    }
}
