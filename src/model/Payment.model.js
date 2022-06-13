const mongoose = require('mongoose');
const slugify = require('slugify');

const PaymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'payment name is required'],
    },

    type: {
        type: String,
        required: [true, 'payment method type is required']
    },

    icon: {
      type: String
    },

        slug: String,
  },

  {
    timestamps: true,
    versionKey: '_version',
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id;
      }
    }
  }
);

// Create role slug from the name
PaymentSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

PaymentSchema.statics.getPayment = function (id) {
  return this.findById(id);
};

module.exports = mongoose.model('Payment', PaymentSchema);