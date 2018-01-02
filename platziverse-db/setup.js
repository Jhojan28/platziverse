'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()
async function setup () {
  if(process.argv.pop() === '--y'){
    const config = {
      database: process.env.DB_NAME || 'platziverse',
      username: process.env.DB_USER || 'platzi',
      password: process.env.DB_PWD || 'platzi',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: s => debug(s),
      setup: true
    }
  
    await db(config).catch(handleFatalError)
  
    console.log('success: ')
    process.exit(0)
  }else{
    console.log('Nothing happened')
  }
  /*let answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing happened')
  }*/
}

function handleFatalError (error) {
  console.log(`${chalk.red('[Fatal error]')} ${error.message}`)
  console.log(error.stack)
  process.exit(1)
}

setup()
