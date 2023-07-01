const app = require('./app.js');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database.js');


//config
dotenv.config({ path: 'backend/config/config.env' });

console.log("working") ;

//connect to database
connectDatabase();

const server=app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

