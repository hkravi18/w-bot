const axios = require('axios');
const fs = require('fs');
const { Client, LocalAuth, Location, List, Buttons } = require('whatsapp-web.js');

// const SESSION_FILE_PATH = './session.json';
// let sessionCfg;
// if (fs.existsSync(SESSION_FILE_PATH)) {
// sessionCfg = require(SESSION_FILE_PATH);
// }

const client = new Client({
authStrategy: new LocalAuth({
clientId: "client-one"
}),
puppeteer: { headless: false },
// session: sessionCfg
});

const qrcode = require('qrcode-terminal');
client.initialize();

client.on('qr', qr => {
qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.on('message', message => {
        if(message.body === 'ping') {
            message.reply('pong');
        }
    });
     
        /*let myGroup;
        myGroup = chats.find(
            (chat) => chat.name === "MyJio"
        );
        console.log(chats[23].id);
        console.log(chats.find(
            (chat) => chat.name === "MyJio"
        ));*/
        const chatId = "918799901000@c.us";
        const text = "Hi";

            setInterval(() => {
            client.sendMessage(
                chatId,text
            );
            console.log("Message Sent");
        },5000);
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
// sessionData = session;
// fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
// if (err) {
// console.error(err);
// }
// });
});