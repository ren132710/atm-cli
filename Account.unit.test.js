const Account = require('./Account')
const FileSystem = require('./FileSystem')

//create a dummy account
async function createAccount(name, balance) {
  const spy = jest.spyOn(FileSystem, 'read').mockReturnValueOnce(Promise.resolve(balance))
  const account = await Account.find(name)
  spy.mockRestore()
  return account
}

describe('Account Unit Tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('should successfully create a new account with balance 0', async () => {
    //given
    const name = 'Clark_Create'
    const spy = jest.spyOn(FileSystem, 'write')
    //when
    const account = await Account.create(name)
    //then
    expect(account.name).toBe(name)
    expect(account.balance).toBe(0)
    expect(account.filePath).toBe(`accounts/${name}.txt`)
    expect(spy).toBeCalledWith(account.filePath, 0)
    // spy.mockRestore()
  })

  test('should successfully deposit into an existing account', async () => {
    //given
    const name = 'Davis_Deposit'
    const depositAmount = 100
    const spy = jest.spyOn(FileSystem, 'write')
    const account = await Account.create(name)
    //when
    await account.deposit(depositAmount)
    //then
    expect(account.balance).toBe(depositAmount)
    expect(account.filePath).toBe(`accounts/${name}.txt`)
    expect(spy).toBeCalledWith(account.filePath, depositAmount)
  })

  test('should successfully withdraw from an existing account', async () => {
    //given
    const name = 'White_Withdraw'
    const startingBalance = 100
    const withdrawAmount = 25
    const spy = jest.spyOn(FileSystem, 'write')
    const account = await createAccount(name, startingBalance)
    //when
    await account.withdraw(withdrawAmount)
    //then
    expect(account.balance).toBe(startingBalance - withdrawAmount)
    expect(account.filePath).toBe(`accounts/${name}.txt`)
    expect(spy).toBeCalledWith(account.filePath, startingBalance - withdrawAmount)
  })

  test('should prevent withdraw when insufficient funds', async () => {
    //given
    const name = 'White_Withdraw'
    const startingBalance = 25
    const withdrawAmount = 100
    const spy = jest.spyOn(FileSystem, 'write')
    const account = await createAccount(name, startingBalance)
    //then
    await expect(account.withdraw(withdrawAmount)).rejects.toThrow()
    expect(account.balance).toBe(startingBalance)
    expect(spy).not.toBeCalled
  })

  test('should return undefined if account not found', async () => {
    //given
    const name = 'Flores_Undefined'
    const spy = jest.spyOn(FileSystem, 'read')
    //when
    const account = await Account.find(name)
    //then
    expect(spy).toHaveBeenCalled
    expect(account).toBeUndefined()
    spy.mockRestore()
  })
})
