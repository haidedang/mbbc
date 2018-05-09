pragma solidity ^0.4.17;

contract Registry {

  uint public total = 1000000000000000000; 

  struct User {
    string url;
  }
  
  mapping (address => User) users; 
  address[] public userAdresses; 
 
  function _register(string _url) public {
      var user = users[msg.sender]; 
      user.url = _url; 

      userAdresses.push(msg.sender); 
      total = total + 1000000000000000000; 
  }

  function getUsers() public view returns (address[]) { 
      return userAdresses; 
  }

  function getTotal() public view returns (uint) {
      return total;
  }

  function getUser(address _address) view public returns (string) { 
      return users[_address].url; 
  }

}
