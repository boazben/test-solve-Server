
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createToken, validateToken } = require('../jwt')


// The four basic active: creat new, read, update and delete:

async function read(filter) {
    return await User.find(filter)
}
exports.read = read

async function readOne(filter, projection) {
    return await User.findOne(filter, projection)
}
exports.readOne = readOne



async function update(newData, id_user) {
    return await User.findByIdAndUpdate(id_user, newData, { new: true });
}
exports.update = update

async function del(_id) {
    return await update(_id, { active: false });
}
exports.del = del

// Register:
exports.register = async data => {

    //TODO validates:
    let user = await readOne({ email: data.email })
    if (user) throw 'האימייל קיים במערכת'
    data.password = bcryptjs.hashSync(data.password, 8)
    user = await User.create(data)
    const token = createToken(user._id)
    const updateUser = await update({ token: token }, user._id)
    updateUser.token = token
    return updateUser
}

// Login:
exports.login = async (email, password) => {
    const user = await readOne({ email: email }, '+password')

    //Check if the detailse or the user correct:
    if (!user) throw 'אמייל או סיסמא לא נכונים'
    if (!bcryptjs.compareSync(password, user.password)) throw 'אמייל או סיסמא לא נכונים'
    
    const token = createToken(user._id)
    user.token = token
    user.lastSee = Date.now()
    
    const updateUser = await update({token: token}, user._id)
    updateUser.token = token //This is for to see the token, we need it in the login
    return updateUser // With the token :)
}  



