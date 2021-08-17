const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const User = new Schema({
    name: {
        first: { type: String, minLength: 2, required: true, lowercase: true },
        last: { type: String, minLength: 2, required: true, lowercase: true }
    },
    email: { type: String, required: true, unique: true, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ },
    password: { type: String, required: true, minLength: 6, maxLength: 120, select: false },
    active: { type: Boolean, default: true },
    token: { type: String, select: false },
    lastSee: { type: Date, default: Date.now() },
    created: { type: Date, default: Date.now() }
});

const UserModel = model('user', User)
module.exports = UserModel

User.virtual('fullName').get(function() {return `${this.name.first} ${this.name.last}`})


