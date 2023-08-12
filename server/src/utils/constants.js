const BNB_ADDRESS = "0x0000000000000000000000000000000000001010";
const COIN_AMOUNT = 0.5;
const ADMIN_GAS_PRICE = 30;
const ADMIN_GAS_LIMIT = 95000;


// const HOST = 'localhost:3306';
// const DB_USER='ruppert'
// const DB_PASS='Q66sp?o8'
// const DB_DATABASE='metatron'

const HOST = 'localhost:3306';
const DB_USER='root'
const DB_PASS=''
const DB_DATABASE='metatron'


const PORT='6000'
const SECRET_JWT='MGLsupersecret'


const EMAIL_HOST='mail.smtp2go.com'
// #EMAIL_SERVICE=smtp2go
// #EMAIL_PORT=2525
// #EMAIL=info@mglcoin.io
// #EMAIL_USER=defigo
// #EMAIL_PWD=ZzAzMmJ0MnRpem8w

const EMAIL_SERVICE='gmail'
const EMAIL='support@metatron.biz'
const EMAIL_PWD='*Y32f6qj'

const FRONT_URL='https://metatron.biz/'
const COINMARKET_APIKEY='340dfac7-6bc4-454f-acaa-f9c30a4c65c0'

module.exports = {
    BNB_ADDRESS,
    COIN_AMOUNT,
    ADMIN_GAS_PRICE,
    ADMIN_GAS_LIMIT,
    HOST,
    DB_USER,
    DB_PASS,
    DB_DATABASE,
    PORT,
    SECRET_JWT,
    EMAIL_HOST,
    EMAIL_SERVICE,
    EMAIL,
    EMAIL_PWD,
    FRONT_URL,
    COINMARKET_APIKEY
}