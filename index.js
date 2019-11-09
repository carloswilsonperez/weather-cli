#!/usr/bin/env node

const program = require('commander');
const { fetchNow, weatherForecast, addCity } = require('./commands');
const { prompt } = require('inquirer'); // require inquirerjs library
const yeoman = require('yeoman-environment');

// Craft questions to present to users
const questions = [
    {
      type : 'input',
      name : 'city',
      message : 'Enter city name ...'
    },
    {
      type : 'input',
      name : 'country',
      message : 'Enter country ...'
    }
  ];

program
    .version('0.0.1')
    .description('Command line Weather Application')

program
    .command("now")
    .alias('n')
    .description('see the current weather in the specified city')
    .action( () => {
      prompt(questions).then(answers =>
      fetchNow(answers));
    });

program
  .command("forecast <city>")
  .alias('f')
  .description('see the weather forcast of a specified city')
  .action(city => weatherForecast(city));

program
  .command('addCity') // No need of specifying arguments here
  .alias('a')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then(answers =>
      addCity(answers));
  });

  const callGenerator = function(name) {
    const env = yeoman.createEnv([name]);
    console.log(`starting creation of project ${name}`);
    env.lookup(() => env.run(`@gbu/gbu-main ${name}`, {
      advanced: program.advanced
    }, err => {
      if (err) {
        logger.error(err);
        process.exit();
      }
      console.log('completed project creation');
      console.log('installing project dependencies');
    }));
  };
  
  program
  .arguments('<project-name>', 'the name of the project to create')
  .option('-a, --advanced', 'do not use the default project settings')
  .action(name => {
    callGenerator(name);
  });



program.parse(process.argv)
