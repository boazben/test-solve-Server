const { Schema, model } = require('mongoose')

const TestPlacement = new Schema({
    user_responds: { type: String},
    test: { type: String, ref: 'tests' },
    typeOfEntrance: { type: String, enum: ['Link', 'Invitation', 'View']},
    status: { type: String, enum: ['In Doing', 'Done', 'Not Open', 'Closed'], default: 'Not Open' },
    submissionDate: { type: Date, transform: t => t?.getTime()},
    startDate: {type: Date, transform: t => t?.getTime()},
    endDate: {type: Date, transform: t => t?.getTime()},
    grade: {type: Number, min: 0},
    responses: Object
}
)

TestPlacement.virtual('user', {
    ref: 'user',
    localField: 'user_responds',
    foreignField: 'email'
})

TestPlacement.virtual('status_he').get(function () {
    return this.status === 'In Doing' ? "בעשייה" : this.status === 'Done' ? "נעשה" : this.status === 'Not Open' ? "לא נפתח" : "סגור"
})

TestPlacement.virtual('typeOfEntrance_he').get(function () {
    return this.typeOfEntrance === 'Link' ? "לינק" : "בהזמנה"
})

const TestPlacementModel = model('testsInlay', TestPlacement)
module.exports = TestPlacementModel