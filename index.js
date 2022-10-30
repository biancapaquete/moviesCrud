const server = require('./be/server');
const bePort = 3000;

server.listen(bePort, () => {
    console.log('Backend server listening to port: ' + bePort);
});
