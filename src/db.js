const mongoose = require('mongoose');
let DB_URL = process.env.DB_URL;
if (process.env.NODE_ENV !== 'production') {
    DB_URL += '_DEV';
}
mongoose.connect(DB_URL, {});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed');
    process.exit(0);
})
