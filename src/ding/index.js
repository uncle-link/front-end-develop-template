import jsapi from './jsapi.json';

const { AUTH_URL, APP_URL } = require(`../config/develop.json`);

async function ddConfig() {

        let isAuth = sessionStorage.getItem("auth");
        if (isAuth) {
            return ;
        }

        let jsapiArr = Object.keys(jsapi);
        try {

            let res = await fetch(AUTH_URL, {
                method: 'POST',
                body: JSON.stringify({
                    url: APP_URL
                })
            });

            console.log('heeh');
            let data = await res.json();
            console.log(data);
            if (data.success) {
                console.log(data);
                const {corpId, timeStamp, nonceStr, signature} = data.data;
                //返回的data数据自行修改
                console.log(data);
                dd.config({
                    agentId: '',
                    corpId: corpId,
                    timeStamp: timeStamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: jsapiArr
                });
                dd.error(err => {
                    console.error(err);
                });
                dd.ready(() => {
                    sessionStorage.setItem("auth", true);
                });
            } else {
                console.log(data.errors);
            }
        } catch (e) {
            console.log(e);
        }
};

export { ddConfig };

