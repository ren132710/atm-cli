const Account = require('./Account')
const fsExtra = require('fs-extra')
const fs = require('fs')

describe('Account tests', () => {
  afterEach(() => {
    fsExtra.emptyDirSync('accounts')
  })

  test('should successfully create a new account with balance 0', async () => {
    const name = 'Smith_Create'
    const account = await Account.create(name)
    expect(account.name).toBe(name)
    expect(account.balance).toBe(0)
    //ensure account file exists and balance is saved to file
    console.log(fs.readFileSync(account.filePath).toString())
    expect(fs.readFileSync(account.filePath).toString()).toBe('0')
  })

  test('should successfully deposit into an existing account', async () => {
    const name = 'Jones_Deposit'
    const account = await Account.create(name)

    await account.deposit(100)
    expect(account.balance).toBe(100)
    expect(fs.readFileSync(account.filePath).toString()).toBe('100')

    await account.deposit(50)
    expect(account.balance).toBe(150)
    expect(fs.readFileSync(account.filePath).toString()).toBe('150')

    await account.deposit(25)
    expect(account.balance).toBe(175)
    expect(fs.readFileSync(account.filePath).toString()).toBe('175')
  })

  test *
    ('should successfully withdraw from an existing account',
    async () => {
      const name = 'James_Withdraw'
      const account = await Account.create(name)
      account.deposit(100)
      account.withdraw(25)
      expect(account.balance).toBe(85)
    })
})

/*

beforeEach(() => {
  try {
    fs.mkdirSync('accounts')
  } catch {
    //ignore any errors
  }
})

afterEach(() => {
  //force option prevents thrown errors
  fs.rmSync('accounts', { recursive: true, force: true })
})

//. indicates static method
describe('.create', () => {
  test('should create a new account and file', async () => {
    //create an account
    const name = 'Smith'
    const account = await Account.create(name)
    //check account is created and balance is zero
    expect(account.name).toBe(name)
    expect(account.balance).toBe(0)
    //ensure account file exists and balance is persisted to file
    expect(fs.readFileSync(account.filePath).toString()).toBe('0')
  })
})

describe('.find', () => {
  test('should find an existing account', async () => {
    const name = 'Smith'
    const balance = 10
    fs.writeFileSync(`accounts/${name}.txt`, balance.toString())
    const account = await Account.find()
    expect(account.name).toBe(name)
    expect(account.balance).toBe(balance)
  })
})

describe('edge cases', () => {
  test('should return undefined if account does not exist', async () => {
    const name = 'Smith'
    const account = await Account.find()
    expect(account).toBeUndefined()
    //expect message
  })
})
*/
