const User = require('./controllers/user')
const { getAllTests, getCreatedTests, createNewTest, getFullTest, getUser } = require('./controllers/global')




module.exports = function Router(server){
 

    // Login With Token:
    server.post('/locaSLogin', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const user = await getUser(token)
            res.send(user)
        } catch (error) {
            res.status(400).send({error: error.message || error});
        }
    })




    // Login:
    server.post('/login', async (req, res) => {
        try {
            const {password, email} = req.body
            const user = await User.login(email, password)
            res.send(user)
        } catch (error) {
            res.status(400).send({error: error.message || error});
        }
    })



    // Register:
    server.put('/register', async (req, res) => {
        try {
            const {name, email, password} = req.body
            const newUser = await User.register({name, email, password})
            res.send(newUser)
        } catch (error) {
            res.status(400).send({error: error.message || error});
        }
    })

    // My Tests (thet need to do):
    server.post('/my_tests', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const myTests = await getAllTests(token)
            res.send(myTests)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })


    // Tests of some user created::
    server.post('/my_created', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const myCreatedTests = await getCreatedTests(token)
            res.send(myCreatedTests)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    // Tests of some user created::
    server.put('/create_test', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const newTest = await createNewTest(token)
            res.send(newTest)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    // Get a test to solve:
    server.get('/get_test', async (req, res) => {
        try {
            const token = req.headers.authorization
            const id_test = req.query.id
            if (!token) throw 'The user not login'
            const test = await getFullTest(id_test ,token)
            res.send(test)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })




}