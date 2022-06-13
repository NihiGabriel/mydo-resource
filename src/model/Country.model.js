const mongoose = require('mongoose');
const slugify = require('slugify');

const CountrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [false, 'country name is required']
        },

        code2: {
            type: String,
            required: [false, 'country in two letters is required']
        },

        code3: {
            type: String,
            required: [false, 'country ciode in three letters is required']
        },

        capital: {
            type: String,
            required: false
        },

        region: {
            type: String,
            required: false
        },

        subregion: {
            type: String,
            required: false
        },

        currencyCode: {
            type: String,
            required: [false, 'currency code is required']
        },

        phoneCode: {
            type: String,
            required: [false, 'phone code is required']
        },

        flag: {
            type: String,
            required: [false, 'country flag is required']
        },

        currencyImage: {
            type: String,
            required: [false, 'currency image is required']
        },

        slug: String,

        states: []

    },

    {
        timestamps: true
    }
);

// create role slug from the name
CountrySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

CountrySchema.statics.findByName = function (roleName) {
    return this.findOne({ name: roleName});
};

CountrySchema.statics.findByCode = function (countryCode) {
    return this.findOne({ code: countryCode});
};

CountrySchema.statics.getCountry = function (id) {
    return this.findById(id);
};

module.exports = mongoose.model('Country', CountrySchema);