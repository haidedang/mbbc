pragma solidity ^0.4.17;

contract Adoption {

  address[16] public adopters;
  uint256[16] public prices;
  uint public totalAmount;

  // Adopting a pet
  function adopt(uint petId) public payable {
    require(petId >= 0 && petId <= 15);
    require(msg.value > prices[petId]);
    
    adopters[petId] = msg.sender;
    prices[petId] = msg.value;
    totalAmount = totalAmount + msg.value;
  
  }

  // Retrieving the adopters
  function getAdopters() public view returns (address[16]) {
    return adopters;
  }

  function getPrices() public view returns (uint256[16]) {
    return prices;
  }

  function getTotalAmount() public view returns (uint) {
    return totalAmount;
  }
}
 