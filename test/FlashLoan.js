const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
  }

describe('FlashLoan', () => {

    let token, flashLoan, flashLoanReceiver
    let deployer

    beforeEach(async () => {
        //Setup accounts 
        accounts = await ethers.getSigners()
        deployer = accounts[0]

        // Load accounts
        const FlashLoan = await ethers.getContractFactory('FlashLoan')
        const FlashLoanReceiver = await ethers.getContractFactory('FlashLoanReceiver')
        const Token = await ethers.getContractFactory('Token')

        // Deploy token
        token = await Token.deploy('AndyDang BlockChain Coin', 'ADBC', '10000000')

        // Deploy Flash Loan pool
        flashLoan = await FlashLoan.deploy(token.address)
        console.log(token.address) 
 

        // Approve tokens before depositing
        let transaction = await token.connect(deployer).approve(flashLoan.address, tokens(10000000))
        await transaction.wait()

        // Deposit tokens into the pool
        transaction = await flashLoan.connect(deployer).depositTokens(tokens(10000000))
        await transaction.wait()

        // Deploy Flash Loan receiver
        flashLoanReceiver = await FlashLoanReceiver.deploy(flashLoan.address)
    })

    describe('Development', () => {
        it('sends tokens to flash loan pool contract', async () => {
            expect(await token.balanceOf(flashLoan.address)).to.equal(tokens(10000000))
        })
    })


    describe('Borrowing fund', () => {
        it('borrows fund from the pool', async () => {
            let amount = tokens(100)
            let transaction = await flashLoanReceiver.connect(deployer).executeFlashLoan(amount)
            let result = await transaction.wait()

            await expect(transaction).to.emit(flashLoanReceiver, 'LoanReceived')
            .withArgs(token.address, amount)
        })
    })
})