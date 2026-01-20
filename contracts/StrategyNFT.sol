// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StrategyNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    // tokenId => strategyId
    mapping(uint256 => uint256) public strategyIdOf;

    constructor() ERC721("StratX Strategy", "STRAT") Ownable(msg.sender) {}

    function mintStrategy(
        address to,
        uint256 strategyId
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        strategyIdOf[tokenId] = strategyId;
        return tokenId;
    }
}
