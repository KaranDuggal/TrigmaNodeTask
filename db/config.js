const constant = require('../db/constant')
module.exports.configure = (mongoose) => {
    // let url = `mongodb://${constant.DB_USER}:`+encodeURIComponent(constant.DB_PASSWORD)+`@${constant.DB_HOST}/${constant.DB_DATABASE_NAME}`;
    let url = `mongodb://localhost/trigmaNodeTask`;
    let connect = function () {
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
    }
    connect();
    let db = mongoose.connection;
    db.once('open', () => { console.log('Connected to db'); })
    db.on('disconnected', connect)
    db.on('error', console.log)

};