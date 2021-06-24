const { Publisher, Subjects } = require('@nijisog/todo_common');

class CountryFoundPublisher extends Publisher {
    
    subject = Subjects.CountryFound;

    constructor(client){
        super(client)
    }
}

module.exports = CountryFoundPublisher;