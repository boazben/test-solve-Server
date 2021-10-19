require('dotenv').config()
const { connect } = require('./db')
const User = require('./controllers/user')
const Test = require('./controllers/test')
const Question = require('./controllers/question')

const TestPlacement = require('./controllers/testPlacement')
const global = require('./controllers/global')
const { checkToken, createObjectOfTest } = require('./controllers/functions')

connect().
    then(async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTgxOTBmNWRmZWQ1MmFkNDI4YWZlNCIsImlhdCI6MTYyODk3MDUxOSwiZXhwIjoxNjMxNTYyNTE5fQ.J6751H9NSbOBWpH4GFM0jCxuFRHFUr6UUzMCZUB68B4'
            
            //----------------------------------Test------------------------------------------------
        // // Read a question: 
        // const res = await Question.readOne( {_id: '6112d6cfb057c14588b60bf2'})
        
        // // Read a test: 
        // const res = await Test.readOne( {_id: '6113e5ff688ab910307a8a94'})
        
            // // Get A Full Test:
        // const res = await global.getFullTest('6112748af97a513ed8590e87', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTgxOTBmNWRmZWQ1MmFkNDI4YWZlNCIsImlhdCI6MTYyODk3MDUxOSwiZXhwIjoxNjMxNTYyNTE5fQ.J6751H9NSbOBWpH4GFM0jCxuFRHFUr6UUzMCZUB68B4')
        //     // // creat test:
            // const res = await Test.create(
        //     {

            //         name: 'מבחן חדש לבחינה',
        //         title: 'באימון חטיבתי- חוזרים הביתה בשלום',
        //         description: 'למען קידום המטרות נעשה פה תיאור',
        //     }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM1Y2JjOGE3MTk2MjRiNDIwMTRhMiIsImlhdCI6MTYyODY3MzM3NiwiZXhwIjoxNjMxMjY1Mzc2fQ.B1oHm6A2L5cSQp_O5hr3D7a-STcdmfhG51SPEVRaojM'
        
        // )
        
        // // Duplication A Test:
        // const res = await Test.duplication('6113b6160ababe17640bc947')
        
        //    //New Test Placement:
        //     const res = await TestPlacement.create({
            
        //             user_responds: '6118190f5dfed52ad428afe4',
        //             test_id:'6112748af97a513ed8590e87',
        //         answers: [
        //             {
        //                     id_question: '6112d6cfb057c14588b60bf2',
        //                     answers: ['6112d6cfb057c14588b60bf5', '6112d6cfb057c14588b60bf4']
        //                 },
        //                 {
        //                 id_question: '6112d91316c7a9464c658b57',
        //                 answers: ['6112d91316c7a9464c658b58']
        //             },
        //         ]
        
        //     })
        // // New Question:
        // const res = await Question.create({
            
        //         title: 'מה בא לי לאכול',
        //         description: 'בחר את התשובה הנכונה ביותר',
        //         test_id: '6112748af97a513ed8590e87',
        //         score: 10,
        //         answers: [{text: 'חלasdב', correct: true}, {text: 'asdבשר', correct: false}, {text: 'דגים', correct: false}]
            
        //         })
        
            // // New Test:
            // const res = await Test.create({
                
                //     name: 'קבלה לדיור מוגן',
                //     title: 'אז מי אתם?',
                //     description: 'למען קידום המטרות נעשה פה תיאור',
                //     creator_id: '61126b8e1204f24614b7a920'
                //     })
        // // Read TestPlacement :
        //     const res = await TestPlacement.readOne({_id: '6119f712c950943b30b430c6'})
                //------------------------------------ User --------------------------------------------------------
                // // New User:
                // const res = await User.register({
                //     name: { first: 'Dani', last: 'Hrshkoviz' },
                //     email: 'Dans@gmail.com',
                //     password: '12345678',
                // })
                
                // // read users:
                // const res = await User.readOne({_id :'61180c630ff8863b00b017f4'})
                
                // //  update user:
                // const res = await User.update({'name': 'shimaon abocazera'}, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM1Y2JjOGE3MTk2MjRiNDIwMTRhMiIsImlhdCI6MTYyODY3MzM3NiwiZXhwIjoxNjMxMjY1Mzc2fQ.B1oHm6A2L5cSQp_O5hr3D7a-STcdmfhG51SPEVRaojM')
                
                // // Login:
                // const res = await User.login('YossyNew@gmail.com', '123456')
                


                // Unit tests:
                // get full test:
                // const res = await createObjectOfTest('6112748af97a513ed8590e87','6112da2db0894c40882ca19e')
                // const res = await global.getFullTest('6112748af97a513ed8590e87', token)
                // const res = await TestPlacement.readOne({}, token)
                // const res = await checkToken(token)

                // // new Answer:
                // const res = await Answer.create({
                //     question: '61190d1ccde9df0aa864a9be',
                //     text: 'קוקה קולה!',
                //     correct: true
                // })

                // // Read Answer
                // const res = await Answer.readOne({_id: '611cafc592f2d63ff02d4b83'}, '+correct')

            // Read Answer
                // const res = await Question.readOne({_id: '611e868b15afd02d50b65736'})

                const res = await global.checkAndCreateExamine("614a22f27723d231044ae7ad", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWNiNmY2NGZmZjc2MWFjODEyYzM4NSIsImlhdCI6MTYzMzIzODIyNCwiZXhwIjoxNjM1ODMwMjI0fQ.2hdqxN218SCkR7rygz0tRx1DwGB_JEbEb0afLuUJHvw" , "vv@gmail.com")

                console.log('inedx page:', res);
            } catch (error) {
                console.log(`error in index page: ${error}`);
            }
            })