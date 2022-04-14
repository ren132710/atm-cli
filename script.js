/*
 * prompt for account
 * if account does not exist, create account
 * prompt for action:
 *   view / find
 *   deposit
 *   withdraw
 */

const Account = require('./Account')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Which account would you like to access? ', (answer) => {
  console.log(`Accessing account: ${answer}`)
  rl.close()
})
