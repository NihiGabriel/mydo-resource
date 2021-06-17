const fs = require('fs');
const colors = require('colors');
const Country = require('../../models/Country.model');

// read in the country.json file
const countries = JSON.parse(
     fs.readFileSync(`${__dirname.split('config')[0]}_data/countries.json`, 'utf-8')      
);

exports.seedCountries = async () => {
     try {
          // fetch all data in the country table
          const c = await Country.find({});

          if(c && c.length > 0) 
          return;

          const seed = await Country.create(countries);

          if(seed) {
               console.log('Country seeded successfully'.green.inverse);
          }
     } catch (err) {
          console.log(`Error: ${err}`.red.inverse);
     }
}
