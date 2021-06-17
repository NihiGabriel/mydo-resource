const fs = require('fs');
const colors = require('colors');

const Language = require('../../models/Language.model');

// read in the language.json file
const languages = JSON.parse(
    fs.readFileSync(`${__dirname.split('config')[0]}_data/languages.json`, 'utf-8')
)

exports.seedLanguages = async() => {
    try {
        // fetch all lang data in the table
        const l = await Language.find({});

        if(l && l.length > 0) return;

        const seed = await Language.create(languages)

        if(seed){
            console.log('Language seeded successfully'.green.inverse);
        }
    } catch (err) {
        console.log(`Error: ${err}`.red.inverse);
    }
}