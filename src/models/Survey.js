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
    recipients: [recipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sendDate: Date,
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

mongoose.model('Survey', surveySchema);