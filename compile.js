const path = require('path');
const fs = require('fs');
const solc = require('solc');

//generate path to Inbox.sol
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// read in contents of file
const source = fs.readFileSync(inboxPath,'utf8');

// get the compiled contract
const compiledCode = solc.compile(source,1);
const contract = compiledCode.contracts[':Inbox'];
module.exports = contract;