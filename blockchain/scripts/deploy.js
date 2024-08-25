const { ethers } = require("hardhat");

async function main() {
  const contractfactory = await ethers.getContractFactory("CoinFlip");

  console.log("deploying.....");
  const CoinFlip = await contractfactory.deploy();
  await CoinFlip.waitForDeployment();
  // await SimpleStorage.deploymentTransaction();
  console.log(`deployed `);
  console.log(CoinFlip.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
