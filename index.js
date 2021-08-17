require('dotenv').config()
const { connect } = require('./db')
const User = require('./controllers/user')
const Test = require('./controllers/test')
const Question = require('./controllers/question')
const TestPlacement = require('./controllers/testPlacement')
const global = require('./controllers/global')
const { test_not_exist } = require('./controllers/unitTest')
const { checkToken, createObjectOfTest } = require('./controllers/functions')

connect().
    then(async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTgxOTBmNWRmZWQ1MmFkNDI4YWZlNCIsImlhdCI6MTYyODk3MDUxOSwiZXhwIjoxNjMxNTYyNTE5fQ.J6751H9NSbOBWpH4GFM0jCxuFRHFUr6UUzMCZUB68B4'
            
            //----------------------------------Test------------------------------------------------
        // // Get A Full Test:
        // const res = await global.getFullTest('6112748af97a513ed8590e87', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTgxOTBmNWRmZWQ1MmFkNDI4YWZlNCIsImlhdCI6MTYyODk3MDUxOSwiZXhwIjoxNjMxNTYyNTE5fQ.J6751H9NSbOBWpH4GFM0jCxuFRHFUr6UUzMCZUB68B4')
        //     // // creat test:
            // const res = await Test.create(
        //     {

            //         name: 'מבחן חדש לבחינה',
        //         titel: 'באימון חטיבתי- חוזרים הביתה בשלום',
        //         description: 'למען קידום המטרות נעשה פה תיאור',
        //     }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM1Y2JjOGE3MTk2MjRiNDIwMTRhMiIsImlhdCI6MTYyODY3MzM3NiwiZXhwIjoxNjMxMjY1Mzc2fQ.B1oHm6A2L5cSQp_O5hr3D7a-STcdmfhG51SPEVRaojM'
        
        // )
        
        // // Duplication A Test:
        // const res = await Test.duplication('6113b6160ababe17640bc947')
        
        //    //New Test Placement:
        //     const res = await TestPlacement.create({
            
        //             user_id: '6118190f5dfed52ad428afe4',
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
            
        //         titel: 'מה בא לי לאכול',
        //         description: 'בחר את התשובה הנכונה ביותר',
        //         test_id: '6112748af97a513ed8590e87',
        //         score: 10,
        //         answers: [{text: 'חלasdב', correct: true}, {text: 'asdבשר', correct: false}, {text: 'דגים', correct: false}]
            
        //         })
        
            // // New Test:
            // const res = await Test.create({
                
                //     name: 'קבלה לדיור מוגן',
                //     titel: 'אז מי אתם?',
                //     description: 'למען קידום המטרות נעשה פה תיאור',
                //     creator_id: '61126b8e1204f24614b7a920'
                //     })
                
                //------------------------------------ User --------------------------------------------------------
                // // New User:
                // const res = await User.register({
                //     name: { first: 'Dani', last: 'Hrshkoviz' },
                //     email: 'Dans@gmail.com',
                //     password: '12345678',
                // })
                
                // // // read users:
                // const res = await User.read({_id :'611356dd8e3c614b48cd1194'})
                
                // //  update user:
                // const res = await User.update({'name': 'shimaon abocazera'}, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM1Y2JjOGE3MTk2MjRiNDIwMTRhMiIsImlhdCI6MTYyODY3MzM3NiwiZXhwIjoxNjMxMjY1Mzc2fQ.B1oHm6A2L5cSQp_O5hr3D7a-STcdmfhG51SPEVRaojM')
                
                // // Login:
                // const res = await User.login('DanyH1@gmail.com', '12345678')
                


                // Unit tests:
                // get full test:
                const res = await createObjectOfTest('6112748af97a513ed8590e87','6112da2db0894c40882ca19e')
                // const res = await global.getFullTest('6112748af97a513ed8590e87', token)
                // const res = await TestPlacement.readOne({}, token)
                // const res = await checkToken(token)
                console.log('inedx page:', res);
            } catch (error) {
                console.log(`error in index page: ${error}`);
            }
            })