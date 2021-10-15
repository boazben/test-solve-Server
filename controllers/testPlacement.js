const TestPlacement = require('../models/testPlacement')

async function create(data) {
    return await TestPlacement.create(data)
}
exports.create = create

async function read(filter) {
    return await TestPlacement.find(filter)
}
exports.read = read

async function readOne(filter) {
    return await TestPlacement.findOne(filter)
}  
exports.readOne = readOne

async function update(_id, newData) {
    return await TestPlacement.findByIdAndUpdate(_id, newData, {new: true});
}
exports.update = update

async function del(_id) {
    return await update(_id, {active: false});
}
exports.del = del