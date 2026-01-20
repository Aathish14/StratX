// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StrategyRegistry {
    uint256 public strategyCount;

    struct Strategy {
        uint256 id;
        address owner;
        string metadataURI;
        bool active;
    }

    mapping(uint256 => Strategy) public strategies;

    event StrategyRegistered(
        uint256 indexed id,
        address indexed owner,
        string metadataURI
    );

    function registerStrategy(string calldata metadataURI) external {
        strategyCount++;

        strategies[strategyCount] = Strategy({
            id: strategyCount,
            owner: msg.sender,
            metadataURI: metadataURI,
            active: true
        });

        emit StrategyRegistered(strategyCount, msg.sender, metadataURI);
    }

    function deactivateStrategy(uint256 strategyId) external {
        Strategy storage strat = strategies[strategyId];
        require(strat.owner == msg.sender, "Not strategy owner");
        strat.active = false;
    }

    function getStrategy(
        uint256 strategyId
    ) external view returns (Strategy memory) {
        return strategies[strategyId];
    }
}
