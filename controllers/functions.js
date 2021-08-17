
const jwt = require('jsonwebtoken')
const UserController = require('./user')
const TestDetails = require('./testPlacement')
const QuestionController = require('./question')
const Test = require('./test')

async function checkToken(token) {
    const jwtObject = jwt.verify(token, process.env.SECRET_JWT)
    if (!jwtObject.id || jwtObject.exp * 1000 < Date.now()) throw 'The user undifind'
    const user = await UserController.readOne({_id: `${jwtObject.id}`})
    if (!user) throw 'The user undifind'
    return user
}
exports.checkToken = checkToken

async function createTestDeatelsForLink(user_id, test_id, timeForTest) {
    return await TestDetails.create({
        user_id: user_id,
        test_id: test_id,
        typeOfEntrance: 'Link',
        status: 'In Doing',
        startDate: Date.now(),
        endDate: Date.now() + timeForTest,
        answers: []
    })
}
exports.createTestDeatelsForLink = createTestDeatelsForLink

async function createObjectOfTest(test_id, testDetails_id) {
    //TODO
    const test = await Test.readOne({_id: test_id});
    // test = {...test}
    // test = test._doc
    const testDetails = await TestDetails.readOne({_id: testDetails_id})
    // testDetails = {...testDetails}
    // testDetails = testDetails._doc
    const questens = await QuestionController.read({test_id: test._id, active: true})
    // questens = {...questens}
    // questens = questens._doc
    // return {...test, ...testDetails, ...questens}
    
    return {
        test_id: test._id,
        name: test.name,
        titel: test.titel,
        creator_id: test.creator_id,
        typeForm: test.typeForm,
        testDetails: testDetails._id,
        responds: testDetails.user_id,
        startDate: testDetails.startDate,
        endDate: testDetails.endDate,
        questens: questens.map(question => {
            return {
                _id: question._id,
                titel: question.titel,
                description: question.description,
                type: question.type,
                required: question.required,
                score: question.score,
                answers: question.answers.map(answer =>{
                    return{answer_text: answer.text}
                }
                )

            }
        }),
        answers: testDetails.answers

    }
}
exports.createObjectOfTest = createObjectOfTest