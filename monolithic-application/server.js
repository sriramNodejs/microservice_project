require('dotenv').config();
const app = require('./app');
const { dbConnect } = require('./utils/dbConnect');

const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
