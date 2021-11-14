
const jwt = require('jsonwebtoken')
const UserController = require('./user')
const TestDetails = require('./testPlacement')
const QuestionController = require('./question')
const QuestionModel = require('../models/question')
const TestPlacementModle = require('../models/testPlacement')
const Test = require('./test')

async function checkToken(token) {
    const jwtObject = jwt.verify(token, process.env.SECRET_JWT)
    if (!jwtObject.id || jwtObject.exp * 1000 < Date.now()) throw 'The user undifind'
    const user = await UserController.readOne({_id: `${jwtObject.id}`})
    if (!user) throw 'The user undifind'
    return user
}
exports.checkToken = checkToken

async function createTestDeatelsForLink(user_email, test_id, timeForTest) {
    return await TestDetails.create({
        user_responds: user_email,
        test: test_id,
        typeOfEntrance: 'Link',
        status: 'In Doing',
        startDate: Date.now(),
        endDate: Date.now() + timeForTest,
        answers: []
    })
}
exports.createTestDeatelsForLink = createTestDeatelsForLink


async function createObjectOfTest(testDetails_id, answersCorecct=false) {
    const res = await TestPlacementModle.findOne({_id: testDetails_id})
        .populate('test')
        .populate({ path: 'test', populate: { path: 'creator' } })
    
    if (answersCorecct) {
        const questions = await QuestionModel.find({test: res.test._id, active: true})
            .select({'+answers.correct': 1})
        res._doc.questens = questions
    } else {
        const questions = await QuestionController.read({test: res.test._id, active: true})
        res._doc.questens = questions
    }
    return res
}
exports.createObjectOfTest = createObjectOfTest

// exports.msToHours = duration => {

//       seconds = Math.floor((duration / 1000) % 60),
//       minutes = Math.floor((duration / (1000 * 60)) % 60),
//       hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
//     hours = (hours < 10) ? "0" + hours : hours;
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;
    
//     if (hours || minutes || seconds) return hours + ":" + minutes + ":" + seconds
//     return '00:00:00'
    

//   }

  async function creatrExempailTest(user) {
    await TestDetails.create({
        user_responds: user.email,
        test: '618e1a1d945b7d2b6017ef57',
        typeOfEntrance: 'Invitation'
    })
  }
  exports.creatrExempailTest = creatrExempailTest