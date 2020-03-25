const HDWalletProvider = require('truffle-hdwallet-provider');//interacts with web3 to allow access to network;
const Web3 = require('web3');
const ganache = require('ganache-cli');
const provider2 = ganache.provider();
const { interface, bytecode } = require('./compile');
const provider = new HDWalletProvider(
  'they chalk affair noodle learn option wheel atom wood clay claw penalty',
  'https://rinkeby.infura.io/v3/e4aaf00ec6a24373bf1448ac555d61f8'
);

const web3 = new Web3(provider2);

(async()=>{
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({
    data: bytecode,
		arguments: ['testing network rinkeby v1'],
  })
  .send({
    from: accounts[0],
		gas: '1000000',
  });
  await result.methods.setMessage("this is the second message")
  .send({
    from: accounts[0]
  });
  const newMessage = await result.methods.message().call();
  console.log({
    newMessage
  })
})()

