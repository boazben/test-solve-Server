const Test = require('../models/test')
const jwt = require('jsonwebtoken')
const { msToHours } = require('./functions')

async function create(data) {
    return await Test.create(data)
}
exports.create = create


async function read(filter) {
    const tests = await Test.find(filter)
    tests.forEach((test) => {
        test._doc.typeForm_he = test.typeForm_he
        test._doc.status_he = test.status_he
    })
    return tests
}
exports.read = read

async function readOne(filter) {
    const test = await Test.findOne(filter)
    if(test) {
        test._doc.typeForm_he = test.typeForm_he
        test._doc.status_he = test.status_he
    }
    return test
}
exports.readOne = readOne

async function update(_idTest, newData) {
   if(newData.deadline) {
    if(newData.deadline < Date.now()) newData = {...newData, status: 'Closed'} 
   }  
    return await Test.findByIdAndUpdate(_idTest, newData, { new: true });
}
exports.update = update


async function del(_id) {
    //TODO-  check in the serve if someone answer on the test. If yes- return a masseage to the client.
    await update(_id, { active: false });
    // return somone aswer? false : true
}
exports.del = del
