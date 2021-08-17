
const mongoose = require('mongoose');


exports.connect = async function connect() {
    try {
        await mongoose.connect(process.env.DB_PATH, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        });
        console.log('Mongo Connection!');
        
    } catch (error) {
        console.log('Error: mongo failed');
    }
}
