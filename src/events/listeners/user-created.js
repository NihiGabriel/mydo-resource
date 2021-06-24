const { Listener, Subjects} = require('@nijisog/todo_common');
const QueueGroupName = require('../groupName');

const Country = require('../../models/Country.model');
const nats = require('../nats');

const CountryFound = require('../publishers/country-found');

class UserCreatedListener extends Listener {
    
    subject = Subjects.UserCreated;
    queueGroupName = QueueGroupName.Auth;

    constructor(client){
        super(client);
    }

    async onMessage(data, msg){
         
        // get the message data
        const { _id, phoneCode } = data;

        // find the country that matches the phone code
        const country = await Country.findOne({ phoneCode: phoneCode });

        if(country){
            const cData = {
                _id: _id,
                country: country
            }

            // publish a new event
            await new CountryFound(nats.client).publish(cData);
        }

        msg.ack();
    }
}

module.exports = UserCreatedListener