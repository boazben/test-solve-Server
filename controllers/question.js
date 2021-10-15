const Question = require('../models/question')

async function create(data) {
    return await Question.create(data)
}
exports.create = create

async function read(filter, correct=false) {
    let questions

    if (correct) {
        questions = await Question.find(filter)
            .select({'+answers.correct': 1})
    }
    else {
        questions = await Question.find(filter)
    }

    // Filter all the tests thay not active:
    questions.forEach((question, index) =>{
        if (!question.active) questions.splice(index, 1)
    })

    // Return just active answers:
    const filterQuestions = questions.map(question => {
        question.answers.forEach((answer, index) => {
            if (!answer.active) question.answers.splice(index, 1)
        })
        return question
    })
    return filterQuestions
}
exports.read = read

async function readOne(filter, correct=false) {
    let question

    if (correct) {
        question = await Question.findOne(filter)
            .select({'+answers.correct': 1})
    }
    else {
        question = await Question.findOne(filter)
    }

    question?.answers?.forEach((answer, index) => {
        if (!answer.active) question.answers.splice(index, 1)
    }) 
    return question
}
exports.readOne = readOne

async function update(_id, newData) {
    return await Question.findByIdAndUpdate(_id, newData, {new: true});
}
exports.update = update

async function del(_id) {
    return await update(_id, {active: false});
}
exports.del = del