const program = require('commander');
const { fetchNow, weatherForecast, addCity } = require('./commands');
const { prompt } = require('inquirer'); // require inquirerjs library

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

program.parse(process.argv)
