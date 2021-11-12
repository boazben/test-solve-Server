const TestModel = require('../models/test')
const TestPlacementModel = require('../models/testPlacement')
const TestController = require('./test')
const { validateToken } = require('../jwt')
const { checkToken, createTestDeatelsForLink, createObjectOfTest } = require('./functions')
const TestDetails = require('./testPlacement')
const QuestionController = require('./question')
const UserController = require('./user')
const QuestionModel = require('../models/question')
const UserModel = require('../models/user')



// Tests:
async function triningTest(_idTest) {
    const test =
        await TestPlacementModel.findOne({ test: _idTest })
        .populate('test')
        .populate({ path: 'test', populate: { path: 'creator' } })
    return test
}
exports.triningTest = triningTest



async function getTesteds(idTest, token) {
    console.log(idTest);
    const user = await checkToken(token)
    const test =  await TestController.readOne({"_id": idTest})
    if (!test) throw 'המבחן לא נמצא במערכת'
    if (test.creator != user._id) throw 'אין הרשאת גישה לנתונים'
    const testeds = await TestPlacementModel.find({"test": test._id})
    for (let tested of testeds) {
        const response = await UserController.readOne({"email": tested.user_responds})
        if (response) {tested._doc.user_responds = response}
        console.log(tested); 
    }
    return testeds
}
exports.getTesteds = getTesteds


async function checkAndCreateExamine(idTest, token, email) {
    const user = await checkToken(token)
    if (!user) throw 'למשתמש אין גישה'
    let test = await TestController.readOne({"_id": idTest, "active": true})
    if (!test) throw 'המבחן לא קיים במערכת'
    if (test.creator != user._id) throw 'למשתמש חסרת הרשאה'
    
    const examine = await createExamine(idTest, email)
    
    if (test.status.includes("Edited")) {
        test = await TestController.update(idTest, {"status": "Distributed"})
    }

    return examine
}
exports.checkAndCreateExamine = checkAndCreateExamine

async function createExamine(idTest, email) {
    const score = await testScores(idTest)
    if (score != 100) throw `מספר הנקודות במבחן הינו ${score}, ניתן להפיץ מבחן עם 100 נקודות.`
    let examine = await TestDetails.readOne({ "user_responds": email, "test": idTest});
    if (examine) throw `המשתמש ${examine.user_responds} כבר זומן למבחן.`

    examine = await TestDetails.create({
        user_responds: email,
        test: idTest,
        typeOfEntranceL: "Invitation"
    })

    return examine
}

async function testScores(idTest) {
    const questions = await QuestionController.read({test: idTest})
    const totalScore = questions.reduce(function (acc, curr) {
        return acc + curr.score
    }, 0)
    return totalScore
}


async function getFullTest(_idTest, token, idUser) {
    // Ceack if the token correct and if the user exist:
    let user
    if (idUser) {
        user = await UserController.readOne({"_id": idUser})
    }
    else  user = await checkToken(token)
   
    // Find the test and cheack if the test exist:
    const test = await TestController.readOne({_id: _idTest, active: true})
    if (!test || !test.active) throw 'The test not exist or deleted'
    // If the user is the creator:
    if (user._id == test.creator && !idUser) {
        const testView = await TestModel.findOne({_id: _idTest, active: true})
        .populate('creator')
        testView._doc.endDate =  Date.now() + test.timeForTest
        const questions = await QuestionController.read({test: test._id, active: true})
        testView._doc.questens = questions
        return testView
    }
    // Find test detels and check a few params:
    const testDetails = await TestDetails.readOne({ test: _idTest, user_responds: user.email})
    // Cheack if exist test TestDetails:
    if (!testDetails) {// No, TestDetails dosen't exist:
        console.log('Test details not exist, line 85');
        // Cheack if the test to shared for everyone from link:
        if (!test.toShared) {
            const toConnect = await UserController.readOne({"_id": test.creator})
            throw `The test accessible to order holders only. Connect:\n${toConnect.email}\n${toConnect.name.first}  ${toConnect.name.last}`
        }
                
        
        else { // The test open for everyone:
            // Create a new test details for the user:
            const newTestDetails = await createTestDeatelsForLink(user._id, _idTest, test.timeForTest)
            // Ceack if the test deadline passed:
            if ((test.deadline ? test.deadline : Infinity) < new Date().getTime()) {
                
                await TestController.update(_idTest, { status: 'Closed' })
                await TestDetails.update(newTestDetails._id, { status: 'Closed' })
                // Reuturn the test to presentation:
                return createObjectOfTest(newTestDetails)
            } else { // The test deadline don't passed:
                // Craate time to end the test:
                await TestDetails.update(newTestDetails._id, { status: 'In Doing', startDate: Date.now(), endDate: (Date.now() + test.timeForTest) })
                // Reuturn the test to presentation:
                return createObjectOfTest(newTestDetails)
            }
        }
    }
    // If exist testDetails, check the status of the test:
    else if (testDetails.status === 'Done' || testDetails.status === 'Closed') {
        // Return the test to presentation:
        return createObjectOfTest(testDetails, true)
    } else {// If the status is 'in doing' or 'not open':
        await  TestDetails.update(testDetails._id, { status: 'In Doing'})
        await TestController.update(_idTest, { status: 'Started' })
        // Cheack if exist "end Date", so the meaning is the user start the test:
        if (!testDetails.endDate) {
            const justForNow = await TestDetails.update(testDetails._id, { status: 'In Doing', startDate: new Date(), endDate: (new Date().getTime() + test.timeForTest) })
            console.log('Test details exist and update, line 114');
            console.log(justForNow);
        } // Craate time to end the test.
        // Cheacke if the end Date of test passed:
        if ( new Date(testDetails.endDate).getTime() < Date.now()) {// The time of the test passed over:x
            
            // Cheange the status of the test to 'done':
            await TestDetails.update(testDetails._id, { status: 'Done' })
            // Reuturn the test to presentation:
            return createObjectOfTest(testDetails)
        } else { // The time of the test still dont passed:
            // Cheacked if the deadline passed:
            if ((test.deadline ? new Date(test.deadline).getTime() : Infinity) < Date.now()) {// The deadline passed:
                console.log('The deadline passed, line 123');
                await TestController.update(_idTest, { status: 'Closed' })
                await TestDetails.update(testDetails._id, { status: 'Closed' })
                // Reuturn the test to presentation:
                return createObjectOfTest(testDetails)
            } else { // The dedline dosen't passed:
                // Reuturn the test to presentation:
                console.log("The deadline dosen't passed, line 130");
                return createObjectOfTest(testDetails)
            }

        }
    }

}
exports.getFullTest = getFullTest

async function getTestToPreview(_idTest, token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    
    // Find the test and cheack if the test exist:
    const test = await TestModel.findOne({_id: _idTest, active: true})
    .populate('creator')
    if (!test || !test.active) throw 'The test not exist or deleted'
    // Cheak if this user relly create this test:
    if (user._id != test.creator) 'Just the creator of this test can to view at the test'
    test._doc.endDate =  Date.now() + test.timeForTest
    return test

}
exports.getTestToPreview = getTestToPreview


async function submitTest(idTestPlacement, answersObj, token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    const testDetails = await TestPlacementModel.findOne({_id: idTestPlacement})
    if (user.email != testDetails.user_responds) throw 'רק המשתמש שמחובר יכול לענות על המבחן'
    if (testDetails.status.includes("Done") || testDetails.status.includes("Closed")) throw 'המשתמש כבר הגיש את המבחן. לא ניתן להגיש מבחן פעמיים.'
    const questions = await QuestionController.read({test: testDetails.test}, true)
    let grade = 0
    await questions.map(question => { 
        questionScore(question, answersObj).
        then((score) => { 
            console.log('grade befor:', grade);
            grade = grade + score
            console.log('grade after:', grade);
        })
       
    })
    grade = Math.round(grade)
    const updateTestDetails = await TestDetails.update(idTestPlacement, {
        grade: grade, 
        responses: answersObj,
        status: 'Done',
        submissionDate: new Date()

    })

    const res = await createObjectOfTest(updateTestDetails._id, true)
    
    return res

}
exports.submitTest = submitTest

async function questionScore(question, responses) {
    console.log(question);
    console.log(responses);
    let questionGrade = 0
        const ansAmount = question.answers.length
        const correctAnsAmount = question.answers.filter(answer => answer.correct).length
        if (correctAnsAmount == 0) return questionGrade = 0
        const score = question.score
        const scoreCorrectAns = score / correctAnsAmount
        const scoreWorngAns = score / ansAmount

        question.answers.forEach((answer) => {
            if (answer.correct) {
                if (responses["inp" + answer._id]) questionGrade += scoreCorrectAns;
            }
            else {
                if (responses["inp" +answer._id]) questionGrade -= scoreWorngAns;
            }
        })

        if (questionGrade < 0) questionGrade = 0
        return questionGrade
}
exports.questionScore = questionScore


async function duplication(_idTest, token) {
    // TODO!
    try {
        const oldTest = await TestController.readOne({ _id: _idTest, active: true})
        const { name, title, description, creator_id, typeForm } = oldTest
        validateToken(creator_id, token)
        // TODO: copy al lthe questens
        return await TestController.create({
            name: name,
            title: title,
            description: description,
            creator_id: creator_id,
            typeForm: typeForm,
        });

    } catch (error) {
        throw error;
    }
}
exports.duplication = duplication


// Get all the test of someone:
async function getAllTests(token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    let tests = await TestPlacementModel.find({ user_responds: user.email})
        .populate('test')
        .populate({ path: 'test', populate: { path: 'creator' } })
    tests = tests.map((test) => {
        if (test?.test?.active) return test
    })
    tests = tests.filter(item => item)
    return tests
}
exports.getAllTests = getAllTests


// Test of some user created:
async function getCreatedTests(token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    return await TestController.read({ creator: user._id , active: true})
}
exports.getCreatedTests = getCreatedTests

// Creat A New Test:
async function createNewTest(token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    const test = await TestController.create({ creator: user._id })
    await createNewQuestion(token, test._id)
    return test
}
exports.createNewTest = createNewTest

// Get Test To Edit:
async function getTestForm(token, idTest) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    const test = await TestController.readOne({ _id: idTest})
    console.log(test);
    if (!test?.active) throw 'המבחן נמחק מהמערכת'
    if (test.creator != user._id) throw 'למשתמש אין הרשאת עריכה למבחן'
    const questions = await QuestionController.read({test: idTest}, true)
    test._doc.questions = questions
    return test
}
exports.getTestForm = getTestForm



// Edit some test:
async function editTest(token, idTest, newData) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    const test = await TestController.readOne({ _id: idTest, active: true })
    if(!test) throw 'המבחן לא קיים במערכת'
    if (user._id != test.creator) throw 'למשתמש אין הרשאת עריכה'
    let { title, description, deadline, active, toShared, status } = newData
    switch (test.status) {
        case 'Edited':
        case 'Distributed':
            return await TestController.update(idTest, newData)
            break;

        case 'Started':
            // Creat an Array with objectes of all the property i want the be editable:
            const started_editable = [{ title: title }, { description: description }, { deadline: deadline }, { active: active }, { toShared: toShared }]
            // Filter all the property they are ton come from the newData (they 'undefind'):
            const toUpdate_started = started_editable.filter(property => { return Object.values(property)[0] != undefined })
            // Creat one Object with all the properties they user want to change, and they editable:
            newData = toUpdate_started.reduce((acc, property) => { return { ...acc, ...property } }, {})
            return await TestController.update(idTest, newData)
            break;

        case 'Closed':
            // status = deadline ? test.respondents[0] ? 'Started' : 'Distributed' : "null"
            // Creat an Array with objectes of all the property i want the be editable:
            const editable = [{ deadline: deadline }, { active: active }, { status: status }]
            // Filter all the property they are ton come from the newData (they 'undefind'):
            const toUpdate = editable.filter(property => { return Object.values(property)[0] != undefined })
            // Creat one Object with all the properties they user want to change, and they editable:
            newData = toUpdate.reduce((acc, property) => { return { ...acc, ...property } }, {})
            return await TestController.update(idTest, newData)
            break;

        default:
            throw 'לא זוהה סטטוס מבחן'
            break;
    }
}
exports.editTest = editTest

// Get Qustin:
async function getQustion(token, idQuestion) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    return await QuestionController.readOne({$and: [{ _id:  idQuestion, active: true}, {answers: {$elemMatch: {active: true}}}]}, true)
    // return await QuestionController.readOne({ _id:  idQuestion, active: true})
}
exports.getQustion = getQustion

// Create new question:
async function createNewQuestion(token, idTest) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    const test = await TestController.readOne({_id: idTest, active: true})
    if(!test) throw 'המבחן לא קיים במערכת'
    if (test.status === 'Closed' || test.status === 'Started') throw 'לא ניתן להוסיף שאלה למבחן מכיוון שהמבחן סגור או שהתחילו לענות עליו'
    const newQuestion = await QuestionController.create({ test: idTest })
    newQuestion.answers.push({
        text: "",
        correct: false
    })
    await newQuestion.save()
    return await TestController.readOne({_id: idTest, active: true})
}
exports.createNewQuestion = createNewQuestion

// Edit some question:
async function editQuestion(token, idQuestion, newData) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    const question = await QuestionModel.findOne({ _id: idQuestion}).
        select({'+answers.correct': 1}).
        populate('test', ['status', 'creator'])
    if(!question) throw 'השאלה לא קיימת במערכת'
    // Filter all the answers they not active:
    question.answers.forEach((answer, index) => {
        if (!answer.active) question.answers.splice(index, 1)
    }) 
    if (user._id != question.test.creator) throw 'למשתמש אין הרשאת עריכה'
    let { title, description, required, answer} = newData
    switch (question.test.status) {
        case 'Edited':
        case 'Distributed':
            // return `test: ${newData.answer}`
            // If the user want update somthing is not answer:
            if (!newData.answer) return await QuestionController.update(idQuestion, newData)
            // To add new answer
            else if (!newData.answer._id) {
                question.answers.push(newData.answer)
                await question.save();
            }
            // To edit answer: 
            else if (newData.answer._id) { // TODO a function to change text / correct
                if(newData.answer.text && newData.answer.correct){
                    const upDateQuestion = await QuestionModel.findOneAndUpdate(
                        { _id: idQuestion, answers: { $elemMatch: { _id: newData.answer._id} } },
                        {
                            $set: {
                                'answers.$.text': newData.answer.text,
                                'answers.$.correct': newData.answer.correct
                            }
                        },
                        { 'new': true }
                    )
                        
                    return await QuestionController.readOne({ _id: idQuestion})
                }
                else if (newData.answer.text){
                    const upDateQuestion = await QuestionModel.findOneAndUpdate(
                        { _id: idQuestion, answers: { $elemMatch: { _id: newData.answer._id} } },
                        {
                            $set: {
                                'answers.$.text': newData.answer.text,
                            }
                        },
                        { 'new': true }
                    )
    
                    // return upDateQuestion
                    return await QuestionController.readOne({ _id: idQuestion})
                }
                else if (newData.answer.correct) {
                    const upDateQuestion = await QuestionModel.findOneAndUpdate(
                        { _id: idQuestion, answers: { $elemMatch: { _id: newData.answer._id} } },
                        {
                            $set: {
                                'answers.$.correct': newData.answer.correct
                            }
                        },
                        { 'new': true }
                    )
    
                    // return upDateQuestion
                    return await QuestionController.readOne({ _id: idQuestion})
                }
                else if (newData.answer.active) {
                    const upDateQuestion = await QuestionModel.findOneAndUpdate(
                        { _id: idQuestion, answers: { $elemMatch: { _id: newData.answer._id} } },
                        {
                            $set: {
                                'answers.$.active': newData.answer.active
                            }
                        },
                        { 'new': true }
                    )
    
                    // return upDateQuestion
                    return await QuestionController.readOne({ _id: idQuestion})
                }
            }
            else throw 'משהו השתבש בעריכת השאלה, בדוק שהמבחן קיים במערכת'
            return question
            break;

        case 'Started': 
            // Creat an Array with objectes of all the property i want the be editable:
            const started_editable = [{ title: title }, { description: description }, { required: required }, { answer: answer }]
            // Filter all the property they are ton come from the newData (they 'undefind'):
            const toUpdate_started = started_editable.filter(property => { return Object.values(property)[0] != undefined })
            // Creat one Object with all the properties they user want to change, and they editable:
            newData = toUpdate_started.reduce((acc, property) => { return { ...acc, ...property } }, {})
            
            // Check if user edit question or answer:
            // If the user want to edit just the question, so edit this:
            
            if (!newData.answer) {
                return await QuestionController.update(idQuestion, newData)
            }
            // To edit an answer:
            else if (newData.answer) {
                // If the user want to edd answer:
                if (!newData.answer._id) throw 'לא ניתן להוסיף שאלה מכיוון שיש אנשים שהתחילו להשיב על המבחן'
                // If the user want to edit answer: 
                else if (newData.answer._id) {
                const upDateQuestion = await QuestionModel.findOneAndUpdate(
                    { _id: idQuestion, answers: { $elemMatch: { _id: newData.answer._id } } },
                    {
                        $set: 
                        {
                            'answers.$.text': newData.answer.text,
                            // 'answers.$.correct': newData.answer.correct
                        }
                    },
                    { 'new': true }
                )
                return upDateQuestion
                }
            }
            else throw 'משהו השתבש בעריכת השאלה'
            break;

        case 'Closed':
            throw 'לא ניתן לערוך תשובות כאשר סטטוס המבחן הוא סגור'
            break;

        default:
            throw 'לא זוהה סטטוס מבחן'
            break;
    }
}
exports.editQuestion = editQuestion

// Get user with token:
async function getUser(token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    return user
}
exports.getUser = getUser


async function getProfile(token, userEmail) {
    const user = await checkToken(token)
    const userProfile = await UserController.readOne({"email": userEmail, "active": true})
    if (!userProfile) return null
    const profile = {
        fullName: userProfile.fullName,
        profilePicture: userProfile.profilePicture
    }
    return profile
}
exports.getProfile = getProfile
