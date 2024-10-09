const  Bot = require("./Bot.js");
require('dotenv').config();

const BOT_TOKEN=(process.env.BOT_TOKEN || "test");

//(async ()=>{
    new Bot(BOT_TOKEN).start();
//})();