const FileSystem = require('./FileSystem')

module.exports = class Account {
  constructor(name) {
    this.#name = name
    this.#balance = 0
  }

  #name
  #balance

  get name() {
    return this.#name
  }

  get balance() {
    return this.#balance
  }

  get filePath() {
    return `accounts/${this.name}.txt`
  }

  static async create(accountName) {
    const account = new Account(accountName)
    await FileSystem.write(account.filePath, account.balance)
    return account
  }

  async deposit(amount) {
    this.#balance = this.#balance + amount
    await FileSystem.write(this.filePath, this.#balance)
  }

  withdraw(amount) {
    try {
      // if (this.balance < amount) throw new Error('Insufficient funds')
      if (this.balance < amount) throw 'Insufficient funds'
      this.#balance = this.#balance - amount
    } catch (err) {
      console.log(err)
    }
  }
}
