const axios = require('axios');
const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const { Client, LocalAuth, Location, List, Buttons } = require('whatsapp-web.js');
const mongoose = require('mongoose');
// const SESSION_FILE_PATH = './session.json';
// let sessionCfg;
// if (fs.existsSync(SESSION_FILE_PATH)) {
// sessionCfg = require(SESSION_FILE_PATH);
// }

app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb+srv://admin_codeforces:mongomongo@cluster0.dd1zn1z.mongodb.net/wbot');

const collection = mongoose.model('Collection', { 
    name: String,
    rating : Number,
    rank : String
});

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
        if(message.body.substring(0,7) === "rating/") {
            const url = "https://codeforces.com/api/user.info?handles=" + message.body.substring(7);
            console.log(message.body.substring(7));
            https.get(url,function (response) {
                response.on("data" ,function (data)  {
                    const user = JSON.parse(data);
                    if (user.status === "FAILED")
                    {
                        console.log("Output (Not found) Sent");
                        message.reply("/user not found/");
                    }
                    else if (user.status === "OK")
                    {
                        console.log("Output Sent");
                        const Rating = user.result[0].rating;
                        message.reply("/" + Rating + "/");
                    }      
                });
            });
        };
    });
});
     
        /*let myGroup;
        myGroup = chats.find(
            (chat) => chat.name === "MyJio"
        );
        console.log(chats[23].id);
        console.log(chats.find(
            (chat) => chat.name === "MyJio"
        ));
        const chatId = "918799901000@c.us";
        const text = "Hi";

            /*setInterval(() => {
            client.sendMessage(
                chatId,text
            );
            console.log("Message Sent");
        },5000);
});*/

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
// sessionData = session;
// fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
// if (err) {
// console.error(err);
// }
// });
});