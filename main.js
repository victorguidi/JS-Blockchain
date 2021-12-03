const SHA256 = require('crypto-js/sha256');
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block {
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; //This should be a random number
    }

    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);

    }

}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("02/12/2021", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    /*addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/ //Old Mining method

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        block.previousHash = this.getLatestBlock().hash;

        console.log('Block successfully mined');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
    
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    verifyChain(){
        for(let i =1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let mycoin = new Blockchain();
mycoin.createTransaction(new Transaction('address1', 'address2', 100));
mycoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
mycoin.minePendingTransactions('Victor-address');

console.log('\n Starting the miner...');
mycoin.minePendingTransactions('Victor-address');

console.log('\nBalance of Victor is', mycoin.getBalanceOfAddress('Victor-address'));
//console.log('Mining Block 1....');
//mycoin.addBlock(new Block(1, "15/05/2021", { Name: "Victor Guidi" }));

//console.log('Mining Block 2....');
//mycoin.addBlock(new Block(2, "18/05/2021", { Name: "Jimmy" }));

//console.log('Is Blockchain valid? ' + mycoin.verifyChain());

console.log('This is the BLockchain so far:')

//mycoin.chain[1].data = { Name: "Jonny"}; //First try to change the data in the first block
//mycoin.chain[1].hash = mycoin.chain[1].calculateHash(); //Try to recalculate the hash

//console.log('Is Blockchain valid? ' + mycoin.verifyChain());

console.log(JSON.stringify(mycoin, null, 4));