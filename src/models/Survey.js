const mongoose = require('mongoose');
const recipientSchema = require('./Recipient');

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: String,
    recipients: [recipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date,
    open: {
        type: Boolean,
        default: true
    }
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('Survey', surveySchema);