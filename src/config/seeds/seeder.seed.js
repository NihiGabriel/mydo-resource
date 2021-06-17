const { seedCountries } = require('./country.seed');
const { seedLanguages } = require('./language.seed');
const { seedPayments } = require('./payment.seed');

exports.seedData = async () => {
    await seedCountries();
    await seedLanguages();
    await seedPayments();
}
