const { Schema, model } = require('mongoose')


const Question = new Schema({
    titel: { type: String },
    description: { type: String },
    type: { type: String, enum: ['radio', 'checkbox'], default: 'radio' },
    test_id: { type: String },
    required: { type: Boolean, default: false },
    score: { type: Number },
    active: { type: Boolean, default: true },
    created: { type: Date, default: Date.now },
    answers: [
        {
            text: String,
            correct: { type: Boolean, default: false, select: false }
            // acitve: { type: Boolean, default: true }
        }
    ]

});

const QuestionModel = model('questions', Question)
module.exports = QuestionModel