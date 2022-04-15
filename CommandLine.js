const readline = require('readline')

module.exports = class CommandLine {
  static ask(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    return new Promise((resolve) => {
      rl.question(`${question} `, (answer) => {
        resolve(answer)
        rl.close()
      })
    })
  }

  static print(text) {
    console.log(text)
  }
}

/*
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
*/
