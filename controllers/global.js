const TestModel = require('../models/test')
const TestController = require('./test')
const { validateToken } = require('../jwt')
const { checkToken, createTestDeatelsForLink, createObjectOfTest } = require('./functions')
const TestDetails = require('./testPlacement')
const QuestionController = require('./question')
const UserController = require('./user')


// Tests:
async function getFullTest(_idTest, token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    // Find the test and cheack if the test exist:
    const test = await TestController.readOne({ _id: _idTest })
    if (!test || !test.active) throw 'The test not exist or deleted'
    // Find test detels and check a fwe params:
    const testDetails = await TestDetails.readOne({ test_id: _idTest, user_id: user._id })
    // Cheack if exist test TestDetails:
    if (!testDetails) {// No, TestDetails dosen't exist:
        // Cheack if the test to shared for everyone from link:
        if (!test.shared) throw 'The test accessible to order holders only'
        else { // The test open for everyone:
            // Create a new test details for the user:
            const newTestDetails = await createTestDeatelsForLink(user._id, _idTest, test.timeForTest)
            // Ceack if the test deadline passed:
            if((test.deadline ? test.deadline : Infinity) < Date.now()) {
                await TestController.update(_idTest, {status: 'Closed'}) 
                await TestDetails.update(newTestDetails._id, {status: 'Closed'})
                // Reuturn the test to presentation:
                return createObjectOfTest(test, newTestDetails)
            } else { // The test deadline don't passed:
                // Craate time to end the test:
                await TestDetails.update(newTestDetails._id, {status: 'In Doing', startDate: Date.now(), endDate: (Date.now() + test.timeForTest)})
                // Reuturn the test to presentation:
                return createObjectOfTest(test, newTestDetails)
            }
        }
    }
    // If exist testDetails, check the status of the test:
    else if (testDetails.status === 'Done' || testDetails.status === 'Closed') {
        // Return the test to presentation:
        return createObjectOfTest(test, testDetails)
    } else {// If the status is 'in doing' or 'not open':
        // Cheace if exist end Date, so the mean is the user finished the test:
        if(!testDetails.endDate) await testDetails.update(testDetails._id, {status: 'In Doing', startDate: Date.now(), endDate: (Date.now() + test.timeForTest)}) // Craate time to end the test.
        // Cheacke if the end Date of test passed:
        if(testDetails.endDate < Date.now()) {// The time of the test passed over:
            // Cheange the status of the test to 'done':
            await testDetails.update(testDetails._id, {status: 'Done'})
            // Reuturn the test to presentation:
            return createObjectOfTest(test, testDetails)
        } else { // The time of the test still dont passed:
            // Cheacked if the deadline passed:
            if ((test.deadline ?  test.deadline : Infinity) > Date.now()) {// The deadline passed:
                await TestController.update(_idTest, {status: 'Closed'}) 
                await testDetails.update(testDetails._id, {status: 'Closed'})
                // Reuturn the test to presentation:
                return createObjectOfTest(test, testDetails)
            } else { // The dedline dosen't passed:
                // Reuturn the test to presentation:
                return createObjectOfTest(test, testDetails)
            }

        }
    }

}
exports.getFullTest = getFullTest


async function duplication(_idTest, token) {
    // TODO!
    try {
        const oldTest = await TestController.readOne({ _id: _idTest })
        const { name, titel, description, creator_id, typeForm } = oldTest
        validateToken(creator_id, token)
        // TODO: copy al lthe questens
        return await TestController.create({
            name: name,
            titel: titel,
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
    const allTestsDetails = await TestDetails.read({user_id: user._id})
    const tests = [];
    for (let details of allTestsDetails) {
        const test = await TestController.readOne({_id: details.test_id})
        const user = await UserController.readOne({_id: test.creator_id})
        test._doc.creator_name = user.name
        test._doc.grade = details.grade
        test._doc.state = details.status
        tests.push(test)
    } // TODO more nice
    return tests
}
exports.getAllTests = getAllTests


// Test of some user created:
async function getCreatedTests(token) {
   // Ceack if the token correct and if the user exist:
   const user = await checkToken(token)
   return await TestController.read({creator_id: user._id})
}
exports.getCreatedTests = getCreatedTests

// Test of some user created:
async function createNewTest(token) {
   // Ceack if the token correct and if the user exist:
   const user = await checkToken(token)
   return await TestController.create({creator_id: user._id})
}
exports.createNewTest = createNewTest

// Get user with token:
async function getUser (token) {
    // Ceack if the token correct and if the user exist:
    const user = await checkToken(token)
    return user
}
exports.getUser = getUser