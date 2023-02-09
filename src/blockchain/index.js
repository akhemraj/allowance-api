const ethers = require("ethers");
const { ERC20_ABI } = require("./utils");
const config = require("../config");

async function getEthersProvider() {
	try {
		const provider = new ethers.providers.InfuraProvider(
			"goerli",
			config.INFURA_PROJECT_ID
		);
		return provider;
		// const privateKey = config.USE;
		// const wallet = new ethers.Wallet(privateKey, provider);
		// const metalinqContract = new ethers.Contract(
		//   mlinqFactoryPolygonAddress,
		//   mlinqFactoryAbi,
		//   wallet,
		// );
		//   return metalinqContract;
	} catch (error) {
		console.log("ERROR::getEthersProvider", error);
	}
}

async function getTokenAddresses(walletAddress) {
	try {
		const apiUrl = `https://api-goerli.etherscan.io/api?module=account&action=tokentx&address=${walletAddress}&sort=asc&apikey=${config.ETHERSCAN_API_KEY}`;
		let response = await fetch(apiUrl);
		let data = await response.json();
		let tokenAddresses = new Set();
		data.result.forEach((tx) => {
			if (!tokenAddresses.has(tx.contractAddress)) {
				tokenAddresses.add(tx.contractAddress);
			}
		});
		return Array.from(tokenAddresses);
	} catch (error) {
		console.log("ERROR::getTokenAddresses:", error);
	}
}

async function getAllowanceByContract(contractAddress, walletAddress){
  const provider = await getEthersProvider();
  abi = [
    "event Approval(address owner, address spender, uint256 value)"
  ];

  contract = new ethers.Contract(contractAddress, abi, provider);
  const events = await contract.queryFilter('Approval');
  const tokenAllowances = [];
  if(events.length){
    for(const event of events){
      const spenderAddr = ethers.utils.defaultAbiCoder.decode(['address'], event.topics[2])
      const allowance = ethers.utils.defaultAbiCoder.decode(['uint256'], event.data)
      tokenAllowances.push({contractAddress, spender: spenderAddr[0], allowance: allowance.toString()});
    }
  }
  return tokenAllowances;
}

const getTokenAllowances = async (walletAddress) => {
	try {
		let allowances = [];
		let tokenAddresses = await getTokenAddresses(walletAddress);
		for (let address of tokenAddresses) {
      const tokenAllowances = await getAllowanceByContract(address);
			if(tokenAllowances.length)
        allowances.push(...tokenAllowances);
		}
		return allowances;
	} catch (error) {
    console.log("ERROR::getTokenAllowances", error);
  }
};

module.exports = { getTokenAllowances };
