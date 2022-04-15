const Account = require('./Account')
const fsExtra = require('fs-extra')
const fs = require('fs')

describe('Account Integration Tests', () => {
  afterEach(() => {
    fsExtra.emptyDirSync('accounts')
  })

  test('should successfully create a new account with balance 0', async () => {
    const name = 'Clark_Create'
    const account = await Account.create(name)
    expect(account.name).toBe(name)
    expect(account.balance).toBe(0)

    //ensure account file exists and balance is saved to file
    expect(fs.readFileSync(account.filePath).toString()).toBe('0')
  })

  test('should successfully deposit into an existing account', async () => {
    const name = 'Davis_Deposit'
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

  test('should successfully withdraw from an existing account', async () => {
    const name = 'White_Withdraw'
    const account = await Account.create(name)
    await account.deposit(100)
    await account.withdraw(25)
    expect(account.balance).toBe(75)
    expect(fs.readFileSync(account.filePath).toString()).toBe('75')
  })

  test('should find an existing account', async () => {
    const name = 'Flores_Find'
    const balance = 25
    fs.writeFileSync(`accounts/${name}.txt`, balance.toString())
    const foundAccount = await Account.find(name)
    expect(foundAccount.name).toBe(name)
    expect(foundAccount.balance).toBe(balance)
    expect(fs.readFileSync(foundAccount.filePath).toString()).toBe('25')
  })

  test('should return undefined if account not found', async () => {
    const name = 'Flores_Undefined'
    const account = await Account.find(name)
    expect(account).toBeUndefined()
  })
})
