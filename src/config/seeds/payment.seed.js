const fs = require('fs');
const colors = require('colors');

const Payment = require('../../models/Payment.model');

// read in payment.json files
const payments = JSON.parse(
    fs.readFileSync(`${__dirname.split('config')[0]}_data/payments.json`, 'utf-8')
)

exports.seedPayments = async () => {
    try {
        // fetch all payment data in the table
        const p = await Payment.find({});

        if(p && p.length > 0) return;

        const seed = await Payment.create(payments)

        if(seed) {
            console.log('Payment seeded successfully'.green.inverse);
        }
    } catch (err) {
        console.log(`Error: ${err}`.red.inverse)
    }
}