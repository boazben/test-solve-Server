const { Schema, model } = require('mongoose')

const aswerSchema = new Schema(
    {
    text: {type: String, default: ""},
    correct: {type: Boolean, default: false, select: false},
    active: {type: Boolean, default: true}
    }
) 

const Question = new Schema({
    titel: { type: String, maxLength: 80},
    description: { type: String, maxLength: 80},
    type: { type: String, enum: ['radio', 'checkbox'], default: 'radio' },
    test: { type: String, ref: 'tests' },
    required: { type: Boolean, default: false },
    score: { type: Number, min: 0, max: 100, default: 0},
    active: { type: Boolean, default: true },
    created: { type: Date, default: Date.now, transform: t => t?.getTime() },
    answers: [aswerSchema]
},
{ timestamps: true}
);

const QuestionModel = model('questions', Question)
module.exports = QuestionModel

