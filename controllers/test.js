const Test = require('../models/test')
const jwt = require('jsonwebtoken')

async function create(data) {
    return await Test.create(data)
}
exports.create = create


async function read(filter) {
    return await Test.find(filter)
}
exports.read = read

async function readOne(filter) {
    return await Test.findOne(filter)
}
exports.readOne = readOne

async function update(_id, newData) {
    const test = await readOne({_id : _id});
    
        if (test.status === 'Closed') {
            // Take from the newData all the property thet I want they editabel:
            const {deadline, active, status} = newData
            // Creat an Array with objectes of all the property i want the be editable:
            const editable = [{deadline: deadline}, {active: active}, {status: status}]
            // Filter all the property they are ton come from the newData (they 'undefind'):
            const toUpdate = editable.filter(property => {return Object.values(property)[0] != undefined})
            // Creat one Object with all the properties they user want to change, and they editable:
            newData = toUpdate.reduce((acc, property) => {return {...acc, ...property}}, {})
        }

        // TODO: A function thet get what can be editable, and to the code above.

        else if (test.status === 'Started') {
            // ASK - how to know somthig from another model?
            
            // Take from the newData all the property thet I want they editabel:
            const {title, description, deadline, active, status} = newData
            // Creat an Array with objectes of all the property i want the be editable:
            const editable = [{title: title}, {description: description}, {deadline: deadline}, {active: active}, {status: status}]
            // Filter all the property they are ton come from the newData (they 'undefind'):
            const toUpdate = editable.filter(property => {return Object.values(property)[0] != undefined})
            // Creat one Object with all the properties they user want to change, and they editable:
            newData = toUpdate.reduce((acc, property) => {return {...acc, ...property}}, {})
        }

    return await Test.findByIdAndUpdate(_id, newData, { new: true });
}
exports.update = update


async function del(_id) {
    //TODO-  check in the serve if someone answer on the test. If yes- return a masseage to the client.
    await update(_id, { active: false });
    // return somone aswer? false : true
}
exports.del = del
