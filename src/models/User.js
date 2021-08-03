const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('User', userSchema);