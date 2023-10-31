import { error } from 'console';
import { ethers } from 'hardhat';

async function main() {
  const Crowdfunding = await ethers.getContractFactory('Crowdfunding');
  const crowdfunding = await Crowdfunding.deploy();
  // await crowdfunding.waitForDeployment();
  await crowdfunding.waitForDeployment();

  console.log("Crowdfunding contract deployed to:", crowdfunding.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
