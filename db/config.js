const constant = require('../db/constant')
module.exports.configure = (mongoose) => {
    // let p = process.argv.find(e => !isNaN(e)) || 27017
    let p = 27017
    let ip = '52.243.66.140'
    console.log('MONGOPORT== ', p);
    // let url = `mongodb://admin:${p}/LMS`;
    // let url = 'mongodb://admin:'+encodeURIComponent('aSfhjddFFds')+'@52.243.66.140/lms';
    let url = `mongodb://${constant.DB_USER}:`+encodeURIComponent(constant.DB_PASSWORD)+`@${constant.DB_HOST}/${constant.DB_DATABASE_NAME}`;
    let connect = function () {
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
    }
    connect();
    let db = mongoose.connection;
    db.once('open', () => { console.log('Connected to db'); })
    db.on('disconnected', connect)
    db.on('error', console.log)

};