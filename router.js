const User = require('./controllers/user')
const { getAllTests, getCreatedTests, createNewTest, getFullTest, getUser, triningTest, editTest, createNewQuestion, editQuestion, getTestForm, getQustion, getTesteds, checkAndCreateExamine, getProfile, submitTest, getTestToPreview } = require('./controllers/global')




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
    
    // Get a profile ditals:
    server.post('/get_profile', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const userEmail = req.body.email
            const profile = await getProfile(token, userEmail)
            res.send(profile)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
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
    
    
    // Tests of some user created:
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
    
    // Test of some user created:
    server.post('/test-form', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const testForm = await getTestForm(token, req.body.idTest)
            res.send(testForm)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })


    
    // Creat new Test:
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
    
    
    // Edit A Test:
    server.put('/edit_test', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const updateTest = await editTest(token, req.body.idTest, req.body.newData)
            res.send(updateTest)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })
    
    // Create A  New Question:
    server.put('/create_question', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const test = await createNewQuestion(token, req.body.idTest)
            res.send(test)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    // Get Question:
    server.post('/get_questin', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const question = await getQustion(token, req.body.idQuestion)
            res.send(question)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    // Edit A Question:
    server.put('/edit_question', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const upDateQuestion = await editQuestion(token, req.body.idQuestion, req.body.newData)
            res.send(upDateQuestion)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    
    // Get a test to solve:
    server.post('/get_test', async (req, res) => {
        try {
            const token = req.headers.authorization
            const idTest = req.body.idTest
            const idUser = req.body.idUser
            if (!token) throw 'The user not login'
            const test = await getFullTest(idTest ,token, idUser)
            res.send(test)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })
    
    // Get a test to preview:
    server.post('/get_test_preview', async (req, res) => {
        try {
            const token = req.headers.authorization
            const id_test = req.body.id
            if (!token) throw 'The user not login'
            const test = await getTestToPreview(id_test ,token)
            res.send(test)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    
    // Submit Test:
    server.put('/Submit_Test', async (req, res) => {
        try {
            const token = req.headers.authorization
            const {idTestPlacement, answersObj} = req.body
            if (!token) throw 'The user not login'
            const test = await submitTest(idTestPlacement, answersObj, token)
            res.send(test)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    // Get all users are tested in some test:
    server.post('/get_testers', async function (req, res)  {
        try {
            const token = req.headers.authorization
            const id_test = req.body.id
            if (!token) throw 'The user not login'
            const test = await getTesteds(id_test ,token)
            res.send(test)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    // Create new examinee from invitation:
    server.put('/create_examinee_invitation', async (req, res) => {
        try {
            const token = req.headers.authorization
            if (!token) throw 'The user not login'
            const {idTest, email} = req.body
            const examinee = await checkAndCreateExamine(idTest, token, email)
            res.send(examinee)
        } catch (error) {
            res.status(400).send({error: error.message + error.stack || error})
        }
    })

    


        
    // ------------------------------------------------------------------------
        
        server.post('/trining', async (req, res) => {
            try {
                const test = await triningTest(req.body.test_id)
                res.send(test)
            } catch (error) {
                res.status(400).send({error: error.message || error});
            }
        })

        
    }