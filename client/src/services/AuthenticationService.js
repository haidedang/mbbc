// import Api from '@/services/Api'

// export default {
//   register (credentials) {
//     return Api().post('register', credentials)
//   },
//   login (credentials) {
//     return Api().post('login', credentials)
//   }
// }

import Api from '@/services/Api';
import $ from 'jquery';

let challenge = null;
let signature = null;

let account = null; 

web3.eth.getAccounts(function(error, accounts) {
    account = accounts[0]; 
  }) 

export default {
    login() {
      return new Promise((resolve,reject)=>{
        asyncLogin().then((result) => {
          $.get('http://localhost:8081/auth/' + challenge[1].value + '/' + result, (res) => {
              if (res === account) {
                  resolve('hey');
              } else {
                  console.log("fail");
              }
          })
      })
      })
       
    }
}

function asyncLogin() {
    return new Promise((resolve, reject) => {
        console.log("Login");
        console.log(account);
        $.get('http://localhost:8081/login/' + account, (data) => {
            console.log(data);
            challenge = data;
            const from = account;

            const params = [challenge, from];
            const method = 'eth_signTypedData';

            web3.currentProvider.sendAsync({
                method,
                params,
                from
            }, async (err, result) => {
                signature = result.result;

                if (err) {
                    return console.error(err);
                }
                if (result.error) {
                    return console.error(result.error);
                }
                resolve(signature);

            });
        });
    })
}








