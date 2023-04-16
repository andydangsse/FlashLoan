// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract FlashLoan {
    Token public token;

    constructor(address _tokenAddress) public {
        token = Token(_tokenAddress);

    }

}