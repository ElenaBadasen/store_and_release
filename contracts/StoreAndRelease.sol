// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title StoreAndRelease
 * @dev Store & release text value after specified time
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract StoreAndRelease {
    string private data;
    uint256 private releaseTime; 
    address private owner;

    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
    }

    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    /**
     * @dev Store values in variables
     * @param input value to store
     * @param timeToPass value to store, after that time period has passed the access to the variable will be given
     */
    function store(string calldata input, uint timeToPass) public isOwner {
        data = input;
        releaseTime = block.timestamp + timeToPass;
    }

    /**
     * @dev Get the value if possible
     */
    function retrieve() public view returns (string memory){
        require(block.timestamp > releaseTime, "Too soon");
        return data;
    }
}