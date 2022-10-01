var scan = require('prompt-sync')();
const { io } = require("socket.io-client");

const socket = io("wss://live.heinsoe.com");
var name = null;
var id = null;
var signed = false;
name = scan("neckname ? : ");

if (!signed) {
    console.log('conecting')
    socket.on("connect", () => {
        id = socket.id;
        signed = true;
        console.log('conected')
        console.log(`Welcome ${name}. U can start chatting.`);
        sent()
    });
}
function sent() {

    var msg = scan(name + " : ");
    if (msg !== 'esc') {
        var data = {
            "id": id,
            "name": name,
            "msg": String(msg)
        }

        socket.emit('data', data, (response) => {
            if (response.status == 'ok') {
                sent()
            }
        })
    }
}


socket.on("reconnect_failed", () => {
    console.log('fail');
});

socket.on('data', function (msg) {
    // console.log('sent')
});
