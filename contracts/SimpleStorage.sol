// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
    
contract SimpleStorage {
    //declares variable favoriteNumber 
    uint256 favoriteNumber;

    // defines event storedNumber that will save 
    // 3 unsigned integers and an address to the blockchain
    event storedNumber(
        uint256 indexed oldNumber,
        uint256 indexed newNumber,
        uint256 addedNumber,
        address sender
    );

    // defines a function store that saves the address, 
    // old and new numbers as well as their total
    function store(uint256 _favoriteNumber) public {
        emit storedNumber(
            favoriteNumber,
            _favoriteNumber,
            _favoriteNumber + favoriteNumber,
            msg.sender
        );
        favoriteNumber = _favoriteNumber;
    }

    // defines a function that retrieves the new number 
    // but NOT the other fields as defined in the event statement  
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }
}
