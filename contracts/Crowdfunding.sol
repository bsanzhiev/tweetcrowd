// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

/********************************/
/*    Learning Purposes ONLY    */                 
/*    DO NOT USE IN PRODUCTION  */
/********************************/

contract Crowdfunding {
  uint256 fundGoal = 10 ether;
  uint256 minContribution = 0.01 ether;

  address payable destinationWallet = payable(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

  mapping (address => uint256) addressContributions;

  function donate() public payable {
    require(msg.value >= minContribution, "Donate Error: Did not meet minimum contribution");
    addressContributions[msg.sender] = msg.value;
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function withdraw() public {
    require (address(this).balance < fundGoal, "ReturnFunds Error: Cannot refund? goal has been met");
    require (addressContributions[msg.sender] != 0, "ReturnFunds Error: You have not contributed");
    uint256 amount = addressContributions[msg.sender];
    payable(msg.sender).transfer(amount);
  }

  // Need to have a fallback function for the contract to be able to receive funds
  receive() external payable {}
}