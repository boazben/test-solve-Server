
const jwt = require('jsonwebtoken')

exports.createToken = id => {
    // The token creating:
    return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: '30d' })
}


exports.validateToken = (id, token) => {
    // Create object with: id, iat and exp:
    const tokenData = jwt.verify(token, process.env.SECRET_JWT)

    // Checked if the token is correct, and if the token not expired:
    if (id != tokenData.id || tokenData.exp * 1000 < Date.now())
        throw {error: 'Token not can connect'}

    // If evrey thing fine, the function return true:    
    return true
}

