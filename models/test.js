const { Schema, model } = require('mongoose');
// const { msToHours } = require('../controllers/functions');

const Test = new Schema({
    name: { type: String, minLength: 2, lowercase: true},
    title: { type: String, default: ''},
    description: { type: String, maxLength: 400, default: '' },
    created: { type: Date, default: Date.now(), transform: v =>  v?.getTime()},
    creator: { type: String, required: true, ref: 'user'},
    deadline: { type: Date , transform: v => v?.getTime()},
    timeForTest: { type: Number, default: 3600000 }, // In milliseconds. defult: Hour. 3600000
    active: { type: Boolean, default: true },
    typeForm: { type: String, enum: ['test', 'survey'], default: 'test' },
    status: { type: String, enum: ['Edited', 'Distributed', 'Started', 'Closed'], default: 'Edited' },
    toShared: { type: Boolean, default: false }, // If user can do the test withuot invaeted, and just with link.
    respondents: [String]

}); 


Test.virtual('typeForm_he').get(function () {
    return this.typeForm === 'test' ? "מבחן" : "שאלון"
})

Test.virtual('status_he').get(function () {
    return this.status === 'Edited' ? "בעריכה" : this.status === 'Distributed' ? "בהפצה" : this.status === 'Started' ? "התחילו להשיב" : "סגור"
})


const TestModel = model('tests', Test)
module.exports = TestModel