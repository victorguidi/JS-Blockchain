const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; //This should be a random number
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2021", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

console.log('Mining Block 1....');
mycoin.addBlock(new Block(1, "15/05/2021", { Name: "Victor Guidi" }));

console.log('Mining Block 2....');
mycoin.addBlock(new Block(2, "18/05/2021", { Name: "Jimmy" }));

console.log('Is Blockchain valid? ' + mycoin.verifyChain());

console.log('This is the BLockchain so far:')

//mycoin.chain[1].data = { Name: "Jonny"}; //First try to change the data in the first block
//mycoin.chain[1].hash = mycoin.chain[1].calculateHash(); //Try to recalculate the hash

//console.log('Is Blockchain valid? ' + mycoin.verifyChain());

console.log(JSON.stringify(mycoin, null, 4));