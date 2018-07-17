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

web3.eth.getAccounts(function (error, accounts) {
    account = accounts[0];
})

export default {
    login(url, auth, login, method, body) {
        return new Promise((resolve, reject) => {
            asyncLogin(url,auth,login).then((result) => {
                /* $.get(url.concat(auth) + challenge[1].value + '/' + result, (res) => {
                    resolve(res)
                }) */
                $.ajax({
                    type: method,
                    url:url.concat(auth) + challenge[1].value + '/' + result,
                    data: body,
                    success: function(res){ 
                        resolve(res)
                    }
                })
            })
        })
    }
}

function asyncLogin(url, auth, login) {
    return new Promise((resolve, reject) => {
        console.log("Login");
        console.log(account);
        console.log( url, auth, login)
        $.ajax({
            type: 'GET',
            url:url.concat(login) + account,
            data:null,
            success: function(data) { 
                console.log(data);
                challenge = data;
                const from = account;
    
                const params = [challenge, from];
                const method = 'eth_signTypedData';
    
                console.log(web3.currentProvider)
                window.web3.currentProvider.sendAsync({
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
            }
        })
        /* $.get(url.concat(login) + account, (data) => {
            console.log(data);
            challenge = data;
            const from = account;

            const params = [challenge, from];
            const method = 'eth_signTypedData';

            console.log(web3.currentProvider)
            window.web3.currentProvider.sendAsync({
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
        }); */
    })
}








