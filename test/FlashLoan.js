const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
  }

describe('FlashLoan', () => {
    beforeEach(async () => {
        //Setup accounts 
        accounts = await ethers.getSigners()
        deployer = accounts[0]

        //Load accounts
        const FlashLoan = await ethers.getContractFactory('FlashLoan')
        const FlashLoanReceiver = await ethers.getContractFactory('FlashLoanReceiver')
        const Token = await ethers.getContractFactory('Token')

        //Deploy token
        token = await Token.deploy('AndyDang BlockChain Coin', 'ADBC', '10000000')

        //Deploy Flash Loan pool
        flashloan = await FlashLoan.deploy(token.address)
    })

    describe('Development', () => {
        it('works', () => {
            expect(1+1).to.equal(2)
        })
    })
})