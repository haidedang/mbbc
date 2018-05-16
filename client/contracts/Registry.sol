pragma solidity ^0.4.15;

// import './ENSRegistry.sol'; 

contract Registry {

  uint public total = 1000000000000000000; 
  struct User {
    string url;
  }
  
  mapping (address => User) users; 
  address[] public userAdresses; 
 
  // function _register(address addressOfENS, bytes32 node, string _url) public {
  //   //  if(ens.owner(node) === msg.sender) 
  //     ENSRegistry Service = ENSRegistry(addressOfENS); 
  //     if (Service.owner(node) == msg.sender){
  //       var user = users[msg.sender]; 
  //       user.url = _url; 
  //       userAdresses.push(msg.sender); 
  //     }
  // }

  function _registerProto(string _url) public {
    //  if(ens.owner(node) === msg.sender) 
        var user = users[msg.sender]; 
        user.url = _url; 
        userAdresses.push(msg.sender); 
        total = total + 1000000000000000000;
     
  }

  function getUsers() public view returns (address[]) { 
      return userAdresses; 
  }

  function getUser(address _address) view public returns (string) { 
      return users[_address].url; 
  }

}
