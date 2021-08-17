const { Schema, model } = require('mongoose')

const TestPlacement = new Schema({
    user_id: { type: String },
    test_id: { type: String },
    typeOfEntrance: { type: String, enum: ['Link', 'Invitation']},
    status: { type: String, enum: ['In Doing', 'Done', 'Not Open', 'Closed'], default: 'Not Open' },
    submissionDate: { type: Date},
    startDate: {type: Date},
    endDate: {type: Date},
    grade: {type: Number, min: 0},
    answers: [{
        id_question: String,
        answers: Array
    }]
}
)

const TestPlacementModel = model('testsInlay', TestPlacement)
module.exports = TestPlacementModel