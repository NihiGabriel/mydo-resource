const mongoose = require('mongoose');
const slugify = require('slugify');

const LanguageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'language name is required ']
        },

        code: {
            type: String,
            required: [true, 'language code in two letters is required']
        }
    },

    {
        timestamp: true,
        versionKey: '_version',
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id;
            }
        }
    }
)

LanguageSchema.set('toJSON', {getters: true, virtuals: true})

LanguageSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true });
    next();
})

module.exports = mongoose.model('Language', LanguageSchema);