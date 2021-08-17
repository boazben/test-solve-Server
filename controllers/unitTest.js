const {} = require('./functions')
const { getFullTest } = require('./global')

/// ------------------------------> Get full test <------------------------------

// User not exist: not done:
exports.user_not_exist = async () => {
    getFullTest()
}

// Test not exist: 
exports.test_not_exist = async () => {
    try {
        const res = await getFullTest('11149dcdd0ccf3472844e92c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTgxOTBmNWRmZWQ1MmFkNDI4YWZlNCIsImlhdCI6MTYyODk3MDUxOSwiZXhwIjoxNjMxNTYyNTE5fQ.J6751H9NSbOBWpH4GFM0jCxuFRHFUr6UUzMCZUB68B4')
        if (res) return false
    } catch (error) {
        console.log('Error:' + error);
        return true
    }
}

