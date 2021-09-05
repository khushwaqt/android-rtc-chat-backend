
// const socketHandler = require('../users/user_handler');

module.exports = function (server) {
    console.log('Initializing socket io...');
    const io = require('socket.io')(server, {
        'pingTimeout': 60000,
        'pingInterval': 25000
    });

    io.on('connect', function (socket) {
        console.log(`New client connected. Socket ID:${socket.id}`)
        socket.on('join', function (userInfo) {
            console.log(`User joined`)
            io.emit('new_user', userInfo);
        });

        socket.on('send_connection_params', function (params) {
            params = JSON.parse(params);
            io.emit('on_connection_params', params)
        });

        socket.on('offer', function (offer) {
            console.log(`Broadcasting offer...`)
            io.emit('on_offer', offer)
        });

        socket.on('ice', function (icecandidates) {
            console.log(`Broadcasting ICE...`)
            io.emit('on_ice', icecandidates)
        });

    });

    io.on('disconnect', function () {
        console.log("User disconnected.")
    });
};



