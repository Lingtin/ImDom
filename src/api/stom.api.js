import { Login, apiUrl } from './api.js';

// import SockJS from 'sockjs-client'
// import Stomp from '@stomp/stompjs';

var stompSubscribe=(params) =>{
    var host = "https://chat.ximiyun.cn"
    Login({token:'u1'}).then((data) => {
        console.log(data);
        var socket = new SockJS(host+'/chat/init');
        //使用STOMP子协议的WebSocket客户端
        var stompClient = Stomp.over(socket);
        stompClient.reconnect_delay = 5000;
        
        stompClient.connect({},function (frame) {
            // setConnected(true);
            //通过stompClient.subscribe订阅/topic/getResponse目标发送的消息，即控制器中的@SendTo
            // stompClient.subscribe(host+'/user/chat/tomessage',function (response) {
            //     showResponse(JSON.parse(response.body));
            // });
        },function() {
            console.log("连接失败")        
        });

    }).catch((err)=>{
        console.log(err);
    })

    


    // stompClient.send(`${apiUrl}/user/chat/tomessage`, {priority: 9}, "Hello, STOMP");
}

export default stompSubscribe;