const Account = require('./Account')
const CommandLine = require('./CommandLine')

async function main() {
  try {
    const accountName = await CommandLine.ask('Which account would you like to access?')
    const account = await Account.find(accountName)
    if (account == null) account = await promptCreateAccount(accountName)
    //TODO: returns error after account creation
    if (account != null) await promptTask(account)
  } catch (e) {
    CommandLine.print('ERROR: Please try again')
  }
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask('That account does not exist. Would you like to create it? (yes/no)')

  if (response === 'yes') {
    return await Account.create(accountName)
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask('What would you like to do? (view/deposit/withdraw/exit)')
  if (response === 'exit') return
  if (response === 'deposit') {
    const amount = parseFloat(await CommandLine.ask('How much?'))
    await account.deposit(amount)
    CommandLine.print('Deposit successful')
  } else if (response === 'withdraw') {
    const amount = parseFloat(await CommandLine.ask('How much?'))
    try {
      await account.withdraw(amount)
      CommandLine.print('Withdrawal successful')
    } catch (e) {
      CommandLine.print(`Insufficient funds. Your withdrawal amount exceeds.`)
    }
  }

  CommandLine.print(`Your balance is ${account.balance}`)
  await promptTask(account)
}

main()
