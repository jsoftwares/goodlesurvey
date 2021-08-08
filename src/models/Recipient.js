const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    responded: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = recipientSchema;