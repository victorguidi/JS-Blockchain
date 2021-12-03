const {Blockchain, Transaction} = require('./blockchain');
const EC =require('elliptic').ec;
const ec = new EC('secp256k1');


const account2 = ec.keyFromPrivate('ec42c256df33236b2707fa8ada8133a101fc836a4fdf318dee1f78b2d9b505e0');
const account2Wallet = account2.getPublic('hex');

const account3 = ec.keyFromPrivate('7797bd5a7585a36ac9ca29cc27098bac439240297b1de3390983748ac3f5799f');
const account3Wallet = account3.getPublic('hex');

const myKey = ec.keyFromPrivate('0d0a3827fb888c26a291e0433da66558730f29852e8ffbad73b4808fb493dbb99');
const myWalletAddress = myKey.getPublic('hex');

let mycoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, account2Wallet, 30);
tx1.signTransaction(myKey);
mycoin.addTransaction(tx1)

console.log('\n Starting the miner...');
mycoin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(account2Wallet, account3Wallet, 10);
tx2.signTransaction(account2);
mycoin.addTransaction(tx2)

console.log('\n Starting the miner...');
mycoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Victor is', mycoin.getBalanceOfAddress(myWalletAddress));
console.log('\nBalance of account2 is', mycoin.getBalanceOfAddress(account2Wallet));
console.log('\nBalance of account3 is', mycoin.getBalanceOfAddress(account3Wallet));

console.log('This is the BLockchain so far:')

console.log(JSON.stringify(mycoin, null, 4));









//console.log('Mining Block 1....');
//mycoin.addBlock(new Block(1, "15/05/2021", { Name: "Victor Guidi" }));

//console.log('Mining Block 2....');
//mycoin.addBlock(new Block(2, "18/05/2021", { Name: "Jimmy" }));

//console.log('Is Blockchain valid? ' + mycoin.verifyChain());





//mycoin.chain[1].data = { Name: "Jonny"}; //First try to change the data in the first block
//mycoin.chain[1].hash = mycoin.chain[1].calculateHash(); //Try to recalculate the hash

//console.log('Is Blockchain valid? ' + mycoin.verifyChain());