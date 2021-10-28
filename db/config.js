const constant = require('../db/constant')
module.exports.configure = (mongoose) => {
    let url = `mongodb://localhost/${constant.DB_NAME}`;
    let connect = function () {
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
    }
    connect();
    let db = mongoose.connection;
    db.once('open', () => { console.log('Connected to db'); })
    db.on('disconnected', connect)
    db.on('error', console.log)

};