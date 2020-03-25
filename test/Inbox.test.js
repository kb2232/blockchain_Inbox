const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { bytecode, interface } = require('../compile');


const INITIAL_MESSAGE = 'hi there olakunle';

let accounts, inbox;
beforeEach(async () => {
	//get all accounts
	accounts = await web3.eth.getAccounts();
	//use one of those accounts to deploy
	inbox = await new web3.eth.Contract(JSON.parse(interface)) //contract needs the interface to interact with abi
		.deploy({
			data: bytecode,
			arguments: ['hi there olakunle'],
		}) // deploy() needs the abi, and since our contract has a constructor, we are calling an instance of it, we need to pass argment to constructor.
		.send({
			from: accounts[0],
			gas: '1000000',
    }); //send 'from' first' account AND will to spend up to '1 million gas'
  inbox.setProvider(provider);
});

/**
 * 1. successfully deploy to local ganache network - check the address
 * 2. make sure a new message variable is set when instance of class is called
 * 3. make sure the message variable is updated when 'setMessage()' is called
 */
describe('Inbox',() => {
	it('deploys a contract', () => {
		assert.ok(inbox.options.address)
  });
  it('has a default message',async()=>{
    const message = await inbox.methods.message().call();
    assert.equal(message,INITIAL_MESSAGE);
  });
  it('can change the message',async()=>{
    const NEWMESSAGE = "this is a new message";
    await inbox.methods.setMessage(NEWMESSAGE)
    .send({
			from: accounts[0]
    });
    const newMessage = await inbox.methods.message().call();
    assert.equal(newMessage,NEWMESSAGE);
  })
});
