const { Schema, model } = require('mongoose');

const Test = new Schema({
    name: { type: String, minLength: 2, lowercase: true, },
    title: { type: String },
    description: { type: String, maxLength: 400 },
    created: { type: Date, default: Date.now() },
    creator_id: { type: String, required: true, },
    deadline: { type: Date },
    timeForTest: { type: Number, default: 3600456 }, // In milliseconds. defult: Hour.
    active: { type: Boolean, default: true },
    typeForm: { type: String, enum: ['test', 'survey'], default: 'test' },
    status: { type: String, enum: ['Edited', 'Distributed', 'Started', 'Closed'], default: 'Edited' },
    shared: { type: Boolean, default: false }

});

const TestModel = model('tests', Test)
module.exports = TestModel