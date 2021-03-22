const axios = require('axios');
const { sm3, sm4 } = require('../dist/index.cjs.js');

axios
  .post('http://124.161.168.232:8082/QiantoonService/AppDict/QueryDictList', rucan)
  .then((res) => {
    // console.log('res = ', res.data);

    const key = sm3('adminAppID' + res.data.head.Timestamp);
    console.log('key => ' + key);

    const decrypt = sm4.decrypt(res.data.data, key);
    console.log('jiemi => ', jiemi);
  })
  .catch((err) => {
    console.log('err = ', err);
  });
